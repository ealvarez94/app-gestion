import {
  applyIpc,
  createRenovacionRecord,
  deleteRenovacionRecord,
  getRenovacionById,
  getRenovaciones,
  updateRenovacionRecord
} from './renovaciones.service.js'

export const listRenovaciones = async (req, res) => {
  const result = await getRenovaciones(req.query)
  res.json(result)
}

export const getRenovacion = async (req, res) => {
  const renovacion = await getRenovacionById(req.params.id)
  res.json(renovacion)
}

export const createRenovacion = async (req, res) => {
  const result = await createRenovacionRecord(req.body)
  res.status(201).json(result)
}

export const updateRenovacion = async (req, res) => {
  const result = await updateRenovacionRecord(req.params.id, req.body)
  res.json(result)
}

export const deleteRenovacion = async (req, res) => {
  const result = await deleteRenovacionRecord(req.params.id)
  res.json(result)
}

export const applyRenovacionesIpc = async (req, res) => {
  const result = await applyIpc(req.body)
  res.json(result)
}
