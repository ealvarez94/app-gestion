import app from './app.js'
import { env } from './config/env.js'

app.listen(env.PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${env.PORT}`)
  console.log(`API disponible en http://localhost:${env.PORT}/api/renovaciones`)
  console.log(`Autenticación en http://localhost:${env.PORT}/auth/login`)
})
