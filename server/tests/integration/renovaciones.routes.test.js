import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

process.env.JWT_SECRET = 'test-secret'

const verifyMock = vi.fn()
const getRenovacionesMock = vi.fn()
const getRenovacionByIdMock = vi.fn()
const createRenovacionRecordMock = vi.fn()
const updateRenovacionRecordMock = vi.fn()
const deleteRenovacionRecordMock = vi.fn()
const applyIpcMock = vi.fn()

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: verifyMock
  }
}))

vi.mock('../../src/modules/renovaciones/renovaciones.service.js', () => ({
  getRenovaciones: getRenovacionesMock,
  getRenovacionById: getRenovacionByIdMock,
  createRenovacionRecord: createRenovacionRecordMock,
  updateRenovacionRecord: updateRenovacionRecordMock,
  deleteRenovacionRecord: deleteRenovacionRecordMock,
  applyIpc: applyIpcMock
}))

const { default: app } = await import('../../src/app.js')
const { ApiError } = await import('../../src/shared/errors/api-error.js')

describe('Renovaciones routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('requiere token para acceder a /api/renovaciones', async () => {
    const response = await request(app).get('/api/renovaciones')

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token no proporcionado'
    })
  })

  it('GET /api/renovaciones devuelve la lista de renovaciones', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    getRenovacionesMock.mockResolvedValue({
      renovaciones: [{ id: 1, nombre_cliente: 'Acme' }],
      totalFacturacion: '120.00',
      count: 1
    })

    const response = await request(app)
      .get('/api/renovaciones?search=acme')
      .set('Authorization', 'Bearer token-valido')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      renovaciones: [{ id: 1, nombre_cliente: 'Acme' }],
      totalFacturacion: '120.00',
      count: 1
    })
    expect(getRenovacionesMock).toHaveBeenCalledWith({ search: 'acme' })
  })

  it('GET /api/renovaciones/:id devuelve una renovación concreta', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    getRenovacionByIdMock.mockResolvedValue({
      id: 7,
      nombre_cliente: 'Cliente Uno'
    })

    const response = await request(app)
      .get('/api/renovaciones/7')
      .set('Authorization', 'Bearer token-valido')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      id: 7,
      nombre_cliente: 'Cliente Uno'
    })
    expect(getRenovacionByIdMock).toHaveBeenCalledWith('7')
  })

  it('GET /api/renovaciones/:id devuelve 404 si no existe', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    getRenovacionByIdMock.mockRejectedValue(
      new ApiError(404, 'Renovación no encontrada')
    )

    const response = await request(app)
      .get('/api/renovaciones/999')
      .set('Authorization', 'Bearer token-valido')

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      error: 'Renovación no encontrada'
    })
  })

  it('POST /api/renovaciones crea una renovación', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    createRenovacionRecordMock.mockResolvedValue({
      id: 8,
      nombre_cliente: 'Cliente Nuevo',
      mensaje: 'Renovación creada exitosamente'
    })

    const payload = {
      nombre_cliente: 'Cliente Nuevo',
      fecha_renovacion: '2026-03-18',
      email: 'nuevo@cliente.com'
    }

    const response = await request(app)
      .post('/api/renovaciones')
      .set('Authorization', 'Bearer token-valido')
      .send(payload)

    expect(response.status).toBe(201)
    expect(response.body).toEqual({
      id: 8,
      nombre_cliente: 'Cliente Nuevo',
      mensaje: 'Renovación creada exitosamente'
    })
    expect(createRenovacionRecordMock).toHaveBeenCalledWith(payload)
  })

  it('PUT /api/renovaciones/:id actualiza una renovación', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    updateRenovacionRecordMock.mockResolvedValue({
      renovacion: { id: 3, empresa: 'Acme' },
      mensaje: 'Renovación actualizada exitosamente'
    })

    const payload = { empresa: 'Acme' }

    const response = await request(app)
      .put('/api/renovaciones/3')
      .set('Authorization', 'Bearer token-valido')
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      renovacion: { id: 3, empresa: 'Acme' },
      mensaje: 'Renovación actualizada exitosamente'
    })
    expect(updateRenovacionRecordMock).toHaveBeenCalledWith('3', payload)
  })

  it('DELETE /api/renovaciones/:id elimina una renovación', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    deleteRenovacionRecordMock.mockResolvedValue({
      mensaje: 'Renovación eliminada exitosamente',
      id: '5'
    })

    const response = await request(app)
      .delete('/api/renovaciones/5')
      .set('Authorization', 'Bearer token-valido')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      mensaje: 'Renovación eliminada exitosamente',
      id: '5'
    })
    expect(deleteRenovacionRecordMock).toHaveBeenCalledWith('5')
  })

  it('POST /api/renovaciones/aplicar-ipc aplica IPC a varias renovaciones', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    applyIpcMock.mockResolvedValue({
      mensaje: 'IPC del 4.5% aplicado a 2 renovaciones',
      renovacionesActualizadas: [{ id: 1 }, { id: 2 }]
    })

    const payload = {
      ids: [1, 2],
      porcentaje: 4.5
    }

    const response = await request(app)
      .post('/api/renovaciones/aplicar-ipc')
      .set('Authorization', 'Bearer token-valido')
      .send(payload)

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      mensaje: 'IPC del 4.5% aplicado a 2 renovaciones',
      renovacionesActualizadas: [{ id: 1 }, { id: 2 }]
    })
    expect(applyIpcMock).toHaveBeenCalledWith(payload)
  })
})
