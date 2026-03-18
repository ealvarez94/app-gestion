import pool from '../../config/db.js'
import { RENOVACIONES_TABLE } from '../renovaciones/renovaciones.constants.js'

export const getMonthlyStats = async () => {
  const [rows] = await pool.execute(`
    SELECT
      MONTH(fecha_renovacion) AS mes,
      YEAR(fecha_renovacion) AS year,
      COUNT(*) AS cantidad,
      SUM(precio) AS total,
      AVG(precio) AS promedio
    FROM ${RENOVACIONES_TABLE}
    GROUP BY YEAR(fecha_renovacion), MONTH(fecha_renovacion)
    ORDER BY YEAR(fecha_renovacion) DESC, MONTH(fecha_renovacion) DESC
  `)

  return rows
}
