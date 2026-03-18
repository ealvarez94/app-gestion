import api from '../../../services/api'

export const loginRequest = async ({ username, password }) => {
  const { data } = await api.post('/auth/login', { username, password })
  return data
}
