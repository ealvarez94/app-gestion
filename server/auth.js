dotenv.config()

import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

// Fuerza la carga del .env desde la carpeta actual del proyecto
dotenv.config({ path: new URL('./.env', import.meta.url).pathname })

// Middleware para verificar JWT
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' })
    }
    req.user = user
    next()
  })
}

// Generar JWT
export const generateToken = (userId, username) => {
  return jwt.sign(
    { userId, username },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  )
}
