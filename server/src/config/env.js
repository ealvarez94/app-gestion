import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const envFilePath = fileURLToPath(new URL('../../.env', import.meta.url))

dotenv.config({ path: envFilePath })

const DEVELOPMENT_CORS_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:4173',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:4173',
  'http://127.0.0.1:5173'
]

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'renovaciones',
  DB_PORT: Number(process.env.DB_PORT || 3306),
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  CORS_ORIGIN: process.env.CORS_ORIGIN || '',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || '',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || ''
}

export const requireEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`)
  }

  return value
}

export const getJwtSecret = () => {
  const secret = requireEnv('JWT_SECRET')

  if (env.NODE_ENV === 'production' && secret.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres en producción')
  }

  return secret
}

export const getAllowedCorsOrigins = () => {
  if (env.CORS_ORIGIN) {
    return env.CORS_ORIGIN
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
  }

  if (env.NODE_ENV !== 'production') {
    return DEVELOPMENT_CORS_ORIGINS
  }

  return []
}
