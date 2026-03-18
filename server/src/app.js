import cors from 'cors'
import express from 'express'
import authRoutes from './modules/auth/auth.routes.js'
import estadisticasRoutes from './modules/estadisticas/estadisticas.routes.js'
import renovacionesRoutes from './modules/renovaciones/renovaciones.routes.js'
import {
  errorHandler,
  notFoundHandler
} from './middlewares/error.middleware.js'

const app = express()

app.use(cors())
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
