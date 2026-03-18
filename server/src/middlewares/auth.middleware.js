import jwt from 'jsonwebtoken'
import { requireEnv } from '../config/env.js'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, requireEnv('JWT_SECRET'), (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' })
    }

    req.user = user
    next()
  })
}
