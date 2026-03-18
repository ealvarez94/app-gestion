import pool from '../../config/db.js'
import {
  ALLOWED_RENOVACION_FIELDS,
  RENOVACIONES_TABLE
} from './renovaciones.constants.js'

const baseSelect = `SELECT * FROM ${RENOVACIONES_TABLE}`

export const findRenovaciones = async ({ search, mes, year }) => {
  let query = `${baseSelect} WHERE 1=1`
  const params = []

  if (search) {
    const searchParam = `%${search}%`
    query += ' AND (nombre_cliente LIKE ? OR empresa LIKE ? OR email LIKE ? OR telefono LIKE ?)'
    params.push(searchParam, searchParam, searchParam, searchParam)
  }

  if (mes) {
    query += ' AND MONTH(fecha_renovacion) = ?'
    params.push(Number.parseInt(mes, 10))
  }

  if (year) {
    query += ' AND YEAR(fecha_renovacion) = ?'
    params.push(Number.parseInt(year, 10))
  }

  query += ' ORDER BY fecha_renovacion DESC'

  const [rows] = await pool.execute(query, params)
  return rows
}

export const findTotalFacturacion = async () => {
  const [totals] = await pool.execute(
    `SELECT SUM(precio) AS total FROM ${RENOVACIONES_TABLE} WHERE precio IS NOT NULL`
  )

  return totals[0]?.total || 0
}

export const findRenovacionById = async (id) => {
  const [rows] = await pool.execute(`${baseSelect} WHERE id = ?`, [id])
  return rows[0] || null
}

export const createRenovacion = async (renovacion) => {
  const values = ALLOWED_RENOVACION_FIELDS.map((field) => renovacion[field] ?? null)

  const [result] = await pool.execute(
    `INSERT INTO ${RENOVACIONES_TABLE}
     (${ALLOWED_RENOVACION_FIELDS.join(', ')})
     VALUES (${ALLOWED_RENOVACION_FIELDS.map(() => '?').join(', ')})`,
    values
  )

  return result.insertId
}

export const updateRenovacionById = async (id, updates) => {
  const fields = Object.keys(updates)

  if (fields.length === 0) {
    return false
  }

  const assignments = fields.map((field) => `${field} = ?`).join(', ')
  const values = fields.map((field) => updates[field])

  const [result] = await pool.execute(
    `UPDATE ${RENOVACIONES_TABLE} SET ${assignments} WHERE id = ?`,
    [...values, id]
  )

  return result.affectedRows > 0
}

export const deleteRenovacionById = async (id) => {
  const [result] = await pool.execute(
    `DELETE FROM ${RENOVACIONES_TABLE} WHERE id = ?`,
    [id]
  )

  return result.affectedRows > 0
}

export const applyIpcToRenovaciones = async (ids, porcentaje) => {
  const placeholders = ids.map(() => '?').join(', ')

  const [result] = await pool.execute(
    `UPDATE ${RENOVACIONES_TABLE}
     SET precio = precio * (1 + ? / 100)
     WHERE id IN (${placeholders})`,
    [porcentaje, ...ids]
  )

  const [rows] = await pool.execute(
    `${baseSelect} WHERE id IN (${placeholders})`,
    ids
  )

  return {
    affectedRows: result.affectedRows,
    renovaciones: rows
  }
}
