import cors from 'cors'
import express from 'express'
import { env, getAllowedCorsOrigins } from './config/env.js'
import authRoutes from './modules/auth/auth.routes.js'
import estadisticasRoutes from './modules/estadisticas/estadisticas.routes.js'
import renovacionesRoutes from './modules/renovaciones/renovaciones.routes.js'
import {
  errorHandler,
  notFoundHandler
} from './middlewares/error.middleware.js'

const app = express()

const allowedOrigins = getAllowedCorsOrigins()
const allowAnyOrigin = env.NODE_ENV !== 'production' && allowedOrigins.length === 0

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowAnyOrigin || allowedOrigins.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error('Origen no permitido por CORS'))
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/auth', authRoutes)
app.use('/api/renovaciones', renovacionesRoutes)
app.use('/api/estadisticas', estadisticasRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'OK', mensaje: 'Servidor funcionando correctamente' })
})

app.use(notFoundHandler)
app.use(errorHandler)

export default app
