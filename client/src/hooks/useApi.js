import { useState } from 'react'
import api from '../services/api'

export const useApi = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const makeRequest = async (method, url, data = null) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api[method](url, data)
      return response.data
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error en la solicitud'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    error,
    get: (url) => makeRequest('get', url),
    post: (url, data) => makeRequest('post', url, data),
    put: (url, data) => makeRequest('put', url, data),
    delete: (url) => makeRequest('delete', url)
  }
}