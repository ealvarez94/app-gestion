import { ApiError } from '../../shared/errors/api-error.js'
import { pickDefinedFields } from '../../shared/utils/pick-defined-fields.js'
import { ALLOWED_RENOVACION_FIELDS } from './renovaciones.constants.js'
import {
  applyIpcToRenovaciones,
  createRenovacion,
  deleteRenovacionById,
  findRenovacionById,
  findRenovaciones,
  findTotalFacturacion,
  updateRenovacionById
} from './renovaciones.repository.js'

const sanitizeRenovacionPayload = (payload) => {
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

export const getRenovaciones = async (filters) => {
  const renovaciones = await findRenovaciones(filters)
  const totalFacturacion = await findTotalFacturacion()

  return {
    renovaciones,
    totalFacturacion: Number.parseFloat(totalFacturacion || 0).toFixed(2),
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
  const renovacion = sanitizeRenovacionPayload(payload)

  if (!renovacion.nombre_cliente || !renovacion.fecha_renovacion || !renovacion.email) {
    throw new ApiError(400, 'Nombre cliente, fecha renovación y email son requeridos')
  }

  const id = await createRenovacion(renovacion)

  return {
    id,
    ...renovacion,
    mensaje: 'Renovación creada exitosamente'
  }
}

export const updateRenovacionRecord = async (id, payload) => {
  const updates = pickDefinedFields(payload, ALLOWED_RENOVACION_FIELDS)

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, 'No hay datos para actualizar')
  }

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
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new ApiError(400, 'Se requiere un array de IDs')
  }

  const { affectedRows, renovaciones } = await applyIpcToRenovaciones(ids, porcentaje)

  return {
    mensaje: `IPC del ${porcentaje}% aplicado a ${affectedRows} renovaciones`,
    renovacionesActualizadas: renovaciones
  }
}
