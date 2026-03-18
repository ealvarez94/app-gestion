import pool from '../../config/db.js'

export const findUserByUsername = async (username) => {
  const [users] = await pool.execute(
    'SELECT id, username, password_hash FROM usuarios WHERE username = ?',
    [username]
  )

  return users[0] || null
}

export const updateAdminPassword = async (passwordHash) => {
  const [result] = await pool.execute(
    'UPDATE usuarios SET password_hash = ? WHERE username = ?',
    [passwordHash, 'admin']
  )

  return result.affectedRows > 0
}
