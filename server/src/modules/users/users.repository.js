import pool from '../../config/db.js'
import { DEFAULT_ADMIN_USERNAME, USERS_TABLE } from './users.constants.js'

export const findUserByUsername = async (username) => {
  const [users] = await pool.execute(
    `SELECT id, username, password_hash FROM ${USERS_TABLE} WHERE username = ?`,
    [username]
  )

  return users[0] || null
}

export const updateUserPasswordByUsername = async (username, passwordHash) => {
  const [result] = await pool.execute(
    `UPDATE ${USERS_TABLE} SET password_hash = ? WHERE username = ?`,
    [passwordHash, username]
  )

  return result.affectedRows > 0
}

export const updateAdminPassword = async (passwordHash) => {
  return updateUserPasswordByUsername(DEFAULT_ADMIN_USERNAME, passwordHash)
}
