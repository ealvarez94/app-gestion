import { ApiError } from '../../shared/errors/api-error.js'
import { formatDecimal } from '../../shared/utils/format-decimal.js'
import {
  applyIpcToRenovaciones,
  createRenovacion,
  deleteRenovacionById,
  findRenovacionById,
  findRenovaciones,
  findTotalFacturacion,
  updateRenovacionById
} from './renovaciones.repository.js'
import {
  validateCreateRenovacionPayload,
  validateIpcPayload,
  validateRenovacionesFilters,
  validateRenovacionUpdatePayload
} from './renovaciones.validators.js'

export const getRenovaciones = async (filters) => {
  const validatedFilters = validateRenovacionesFilters(filters)
  const renovaciones = await findRenovaciones(validatedFilters)
  const totalFacturacion = await findTotalFacturacion()

  return {
    renovaciones,
    totalFacturacion: formatDecimal(totalFacturacion),
    count: renovaciones.length
  }
}

export const getRenovacionById = async (id) => {
  const renovacion = await findRenovacionById(id)

  if (!renovacion) {
    throw new ApiError(404, 'Renovación no encontrada')
  }

  return renovacion
}

export const createRenovacionRecord = async (payload) => {
  const renovacion = validateCreateRenovacionPayload(payload)

  const id = await createRenovacion(renovacion)

  return {
    id,
    ...renovacion,
    mensaje: 'Renovación creada exitosamente'
  }
}

export const updateRenovacionRecord = async (id, payload) => {
  const updates = validateRenovacionUpdatePayload(payload)

  const updated = await updateRenovacionById(id, updates)

  if (!updated) {
    throw new ApiError(404, 'Renovación no encontrada')
  }

  const renovacion = await findRenovacionById(id)

  return {
    renovacion,
    mensaje: 'Renovación actualizada exitosamente'
  }
}

export const deleteRenovacionRecord = async (id) => {
  const deleted = await deleteRenovacionById(id)

  if (!deleted) {
    throw new ApiError(404, 'Renovación no encontrada')
  }

  return {
    mensaje: 'Renovación eliminada exitosamente',
    id
  }
}

export const applyIpc = async ({ ids, porcentaje = 3.5 }) => {
  const validatedPayload = validateIpcPayload({ ids, porcentaje })

  const { affectedRows, renovaciones } = await applyIpcToRenovaciones(
    validatedPayload.ids,
    validatedPayload.porcentaje
  )

  return {
    mensaje: `IPC del ${validatedPayload.porcentaje}% aplicado a ${affectedRows} renovaciones`,
    renovacionesActualizadas: renovaciones
  }
}
