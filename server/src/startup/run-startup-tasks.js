import bcrypt from 'bcryptjs'
import { pathToFileURL } from 'url'
import { env } from '../config/env.js'
import { bootstrapAdminUser } from '../modules/users/users.service.js'

export const runStartupTasks = async () => {
  const hasAdminUsername = Boolean(env.ADMIN_USERNAME)
  const hasAdminPassword = Boolean(env.ADMIN_PASSWORD)

  if (!hasAdminUsername && !hasAdminPassword) {
    return
  }

  if (!hasAdminUsername || !hasAdminPassword) {
    throw new Error('ADMIN_USERNAME y ADMIN_PASSWORD deben configurarse juntos')
  }

  const passwordHash = await bcrypt.hash(env.ADMIN_PASSWORD, 10)
  const result = await bootstrapAdminUser({
    username: env.ADMIN_USERNAME,
    passwordHash
  })

  console.log(`Bootstrap admin completado: ${result.username} (${result.action})`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runStartupTasks().catch((error) => {
    console.error('Error al ejecutar tareas de arranque:', error.message)
    process.exit(1)
  })
}
