import { env } from '../../config/env.js'
import { ApiError } from '../../shared/errors/api-error.js'
import {
  DEFAULT_ADMIN_USERNAME
} from './users.constants.js'
import {
  createUser,
  findUserByUsername,
  updateUserPasswordByUsername
} from './users.repository.js'

const getAdminUsername = () => env.ADMIN_USERNAME || DEFAULT_ADMIN_USERNAME

export const getUserByUsername = async (username) => {
  return findUserByUsername(username)
}

export const ensureAdminUserExists = async () => {
  const adminUser = await findUserByUsername(getAdminUsername())

  if (!adminUser) {
    throw new ApiError(404, 'Usuario admin no encontrado')
  }

  return adminUser
}

export const changeAdminPassword = async (passwordHash) => {
  return updateUserPasswordByUsername(getAdminUsername(), passwordHash)
}

export const changeUserPassword = async ({ username, passwordHash }) => {
  const updated = await updateUserPasswordByUsername(username, passwordHash)

  if (!updated) {
    throw new ApiError(404, 'Usuario no encontrado')
  }

  return updated
}

export const bootstrapAdminUser = async ({ username = getAdminUsername(), passwordHash }) => {
  const existingUser = await findUserByUsername(username)

  if (!existingUser) {
    await createUser({ username, passwordHash })

    return {
      username,
      action: 'created'
    }
  }

  await updateUserPasswordByUsername(username, passwordHash)

  return {
    username,
    action: 'updated'
  }
}
