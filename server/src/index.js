import app from './app.js'
import { env } from './config/env.js'
import { runStartupTasks } from './startup/run-startup-tasks.js'

await runStartupTasks()

app.listen(env.PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en puerto ${env.PORT}`)
  console.log(`Entorno: ${env.NODE_ENV}`)
})
