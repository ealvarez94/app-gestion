import { ApiError } from '../shared/errors/api-error.js'

export const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
}

export const errorHandler = (error, req, res, next) => {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ error: error.message })
  }

  console.error('Error no controlado:', error)

  return res.status(500).json({ error: 'Error en el servidor' })
}
