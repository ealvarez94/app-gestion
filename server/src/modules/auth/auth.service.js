import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { requireEnv } from '../../config/env.js'
import { ApiError } from '../../shared/errors/api-error.js'
import { findUserByUsername } from '../users/users.repository.js'

const jwtSecret = requireEnv('JWT_SECRET')

export const generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, jwtSecret, { expiresIn: '24h' })
}

export const loginUser = async ({ username, password }) => {
  if (!username || !password) {
    throw new ApiError(400, 'Usuario y contraseña requeridos')
  }

  const user = await findUserByUsername(username)

  if (!user) {
    throw new ApiError(401, 'Usuario o contraseña incorrectos')
  }

  const validPassword = await bcrypt.compare(password, user.password_hash)

  if (!validPassword) {
    throw new ApiError(401, 'Usuario o contraseña incorrectos')
  }

  return {
    token: generateToken(user.id, user.username),
    user: { id: user.id, username: user.username },
    mensaje: 'Login exitoso'
  }
}
