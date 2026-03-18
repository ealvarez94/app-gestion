import { ApiError } from '../../shared/errors/api-error.js'
import {
  DEFAULT_ADMIN_USERNAME
} from './users.constants.js'
import {
  findUserByUsername,
  updateAdminPassword,
  updateUserPasswordByUsername
} from './users.repository.js'

export const getUserByUsername = async (username) => {
  return findUserByUsername(username)
}

export const ensureAdminUserExists = async () => {
  const adminUser = await findUserByUsername(DEFAULT_ADMIN_USERNAME)

  if (!adminUser) {
    throw new ApiError(404, 'Usuario admin no encontrado')
  }

  return adminUser
}

export const changeAdminPassword = async (passwordHash) => {
  return updateAdminPassword(passwordHash)
}

export const changeUserPassword = async ({ username, passwordHash }) => {
  const updated = await updateUserPasswordByUsername(username, passwordHash)

  if (!updated) {
    throw new ApiError(404, 'Usuario no encontrado')
  }

  return updated
}
