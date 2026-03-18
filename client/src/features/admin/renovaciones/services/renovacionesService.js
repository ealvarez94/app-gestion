import api from '../../../../services/api'
import { buildRenovacionesQuery } from '../utils'

export const getRenovaciones = async (filter) => {
  const { data } = await api.get(buildRenovacionesQuery(filter))
  return data
}

export const createRenovacion = async (payload) => {
  const { data } = await api.post('/api/renovaciones', payload)
  return data
}

export const deleteRenovacion = async (id) => {
  const { data } = await api.delete(`/api/renovaciones/${id}`)
  return data
}

export const applyRenovacionesIpc = async ({ ids, porcentaje }) => {
  const { data } = await api.post('/api/renovaciones/aplicar-ipc', {
    ids,
    porcentaje
  })

  return data
}
