import request from 'supertest'
import { beforeEach, describe, expect, it, vi } from 'vitest'

process.env.JWT_SECRET = 'test-secret'

const loginUserMock = vi.fn()
const verifyMock = vi.fn()

vi.mock('../../src/modules/auth/auth.service.js', async () => {
  const actual = await vi.importActual('../../src/modules/auth/auth.service.js')

  return {
    ...actual,
    loginUser: loginUserMock
  }
})

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: verifyMock
  }
}))

const appModule = await import('../../src/app.js')
const { ApiError } = await import('../../src/shared/errors/api-error.js')

const app = appModule.default

describe('Auth routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('POST /auth/login devuelve 200 cuando el login es correcto', async () => {
    loginUserMock.mockResolvedValue({
      token: 'token-valido',
      user: { id: 1, username: 'admin' },
      mensaje: 'Login exitoso'
    })

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'secreta' })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      token: 'token-valido',
      user: { id: 1, username: 'admin' },
      mensaje: 'Login exitoso'
    })
    expect(loginUserMock).toHaveBeenCalledWith({
      username: 'admin',
      password: 'secreta'
    })
  })

  it('POST /auth/login devuelve 400 cuando faltan credenciales', async () => {
    loginUserMock.mockRejectedValue(
      new ApiError(400, 'Usuario y contraseña requeridos')
    )

    const response = await request(app)
      .post('/auth/login')
      .send({ username: '', password: '' })

    expect(response.status).toBe(400)
    expect(response.body).toEqual({
      error: 'Usuario y contraseña requeridos'
    })
  })

  it('POST /auth/login devuelve 401 cuando el login falla', async () => {
    loginUserMock.mockRejectedValue(
      new ApiError(401, 'Usuario o contraseña incorrectos')
    )

    const response = await request(app)
      .post('/auth/login')
      .send({ username: 'admin', password: 'incorrecta' })

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Usuario o contraseña incorrectos'
    })
  })

  it('GET /auth/verify devuelve 401 sin token', async () => {
    const response = await request(app).get('/auth/verify')

    expect(response.status).toBe(401)
    expect(response.body).toEqual({
      error: 'Token no proporcionado'
    })
  })

  it('GET /auth/verify devuelve 403 con token inválido', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(new Error('Token inválido'))
    })

    const response = await request(app)
      .get('/auth/verify')
      .set('Authorization', 'Bearer token-invalido')

    expect(response.status).toBe(403)
    expect(response.body).toEqual({
      error: 'Token inválido o expirado'
    })
  })

  it('GET /auth/verify devuelve 200 con token válido', async () => {
    verifyMock.mockImplementation((token, secret, callback) => {
      callback(null, { userId: 1, username: 'admin' })
    })

    const response = await request(app)
      .get('/auth/verify')
      .set('Authorization', 'Bearer token-valido')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      valid: true,
      user: { userId: 1, username: 'admin' },
      mensaje: 'Token válido'
    })
  })
})
