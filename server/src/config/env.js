import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const envFilePath = fileURLToPath(new URL('../../.env', import.meta.url))

dotenv.config({ path: envFilePath })

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_NAME: process.env.DB_NAME || 'renovaciones',
  DB_PORT: Number(process.env.DB_PORT || 3306),
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN || ''
}

export const requireEnv = (name) => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Falta la variable de entorno requerida: ${name}`)
  }

  return value
}
