import { describe, expect, it } from 'vitest'
import { ApiError } from '../../../src/shared/errors/api-error.js'
import {
  validateCreateRenovacionPayload,
  validateIpcPayload,
  validateRenovacionesFilters,
  validateRenovacionUpdatePayload
} from '../../../src/modules/renovaciones/renovaciones.validators.js'

describe('renovaciones.validators', () => {
  it('valida y normaliza filtros de renovaciones', () => {
    expect(
      validateRenovacionesFilters({
        search: '  cliente  ',
        mes: '3',
        year: '2026'
      })
    ).toEqual({
      search: 'cliente',
      mes: 3,
      year: 2026
    })
  })

  it('lanza error si el mes no es válido', () => {
    expect(() => validateRenovacionesFilters({ mes: '13' })).toThrow(ApiError)
    expect(() => validateRenovacionesFilters({ mes: '13' })).toThrow('Mes no es válido')
  })

  it('valida el payload mínimo requerido al crear una renovación', () => {
    expect(
      validateCreateRenovacionPayload({
        nombre_cliente: 'Acme',
        fecha_renovacion: '2026-03-18',
        email: 'cliente@acme.com'
      })
    ).toMatchObject({
      nombre_cliente: 'Acme',
      fecha_renovacion: '2026-03-18',
      email: 'cliente@acme.com',
      comentarios: '',
      servicios_contratados: ''
    })
  })

  it('lanza error si faltan campos requeridos al crear', () => {
    expect(() => validateCreateRenovacionPayload({ nombre_cliente: 'Acme' })).toThrow(ApiError)
    expect(() => validateCreateRenovacionPayload({ nombre_cliente: 'Acme' })).toThrow(
      'Nombre cliente, fecha renovación y email son requeridos'
    )
  })

  it('filtra campos no permitidos al actualizar', () => {
    expect(
      validateRenovacionUpdatePayload({
        empresa: 'Acme',
        precio: 120,
        campo_invalido: true
      })
    ).toEqual({
      empresa: 'Acme',
      precio: 120
    })
  })

  it('lanza error si no hay campos válidos para actualizar', () => {
    expect(() => validateRenovacionUpdatePayload({ campo_invalido: true })).toThrow(ApiError)
    expect(() => validateRenovacionUpdatePayload({ campo_invalido: true })).toThrow(
      'No hay datos para actualizar'
    )
  })

  it('valida y normaliza el payload de IPC', () => {
    expect(
      validateIpcPayload({
        ids: ['1', 2, '3'],
        porcentaje: '4.5'
      })
    ).toEqual({
      ids: [1, 2, 3],
      porcentaje: 4.5
    })
  })

  it('lanza error si los ids del IPC no son válidos', () => {
    expect(() => validateIpcPayload({ ids: ['1', 'x'] })).toThrow(ApiError)
    expect(() => validateIpcPayload({ ids: ['1', 'x'] })).toThrow(
      'Los IDs enviados no son válidos'
    )
  })
})
