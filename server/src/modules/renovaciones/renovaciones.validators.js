import { ApiError } from '../../shared/errors/api-error.js'
import { pickDefinedFields } from '../../shared/utils/pick-defined-fields.js'
import { ALLOWED_RENOVACION_FIELDS } from './renovaciones.constants.js'

const ensureIntegerInRange = (value, { min, max, fieldName }) => {
  const parsedValue = Number.parseInt(value, 10)

  if (Number.isNaN(parsedValue) || parsedValue < min || parsedValue > max) {
    throw new ApiError(400, `${fieldName} no es válido`)
  }

  return parsedValue
}

export const sanitizeRenovacionPayload = (payload) => {
  return {
    nombre_cliente: payload.nombre_cliente,
    empresa: payload.empresa ?? null,
    giro_bancario: payload.giro_bancario ?? 0,
    b_flag: payload.b_flag ?? 0,
    precio: payload.precio ?? null,
    fecha_renovacion: payload.fecha_renovacion,
    comentarios: payload.comentarios ?? '',
    servicios_contratados: payload.servicios_contratados ?? '',
    telefono: payload.telefono ?? '',
    email: payload.email ?? ''
  }
}

export const validateRenovacionesFilters = (filters) => {
  const validatedFilters = {
    search: filters.search?.trim() || ''
  }

  if (filters.mes !== undefined && filters.mes !== '') {
    validatedFilters.mes = ensureIntegerInRange(filters.mes, {
      min: 1,
      max: 12,
      fieldName: 'Mes'
    })
  }

  if (filters.year !== undefined && filters.year !== '') {
    validatedFilters.year = ensureIntegerInRange(filters.year, {
      min: 2000,
      max: 2100,
      fieldName: 'Año'
    })
  }

  return validatedFilters
}

export const validateCreateRenovacionPayload = (payload) => {
  const renovacion = sanitizeRenovacionPayload(payload)

  if (!renovacion.nombre_cliente || !renovacion.fecha_renovacion) {
    throw new ApiError(400, 'Nombre cliente y fecha renovación son requeridos')
  }

  return renovacion
}

export const validateRenovacionUpdatePayload = (payload) => {
  const updates = pickDefinedFields(payload, ALLOWED_RENOVACION_FIELDS)

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'No hay datos para actualizar')
  }

  return updates
}

export const validateIpcPayload = ({ ids, porcentaje = 3.5 }) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, 'Se requiere un array de IDs')
  }

  const normalizedIds = ids.map((id) => Number.parseInt(id, 10))

  if (normalizedIds.some(Number.isNaN)) {
    throw new ApiError(400, 'Los IDs enviados no son válidos')
  }

  const normalizedPorcentaje = Number.parseFloat(porcentaje)

  if (Number.isNaN(normalizedPorcentaje)) {
    throw new ApiError(400, 'El porcentaje de IPC no es válido')
  }

  return {
    ids: normalizedIds,
    porcentaje: normalizedPorcentaje
  }
}
