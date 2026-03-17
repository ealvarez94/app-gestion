

import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

// Fuerza la carga del .env desde la carpeta actual del proyecto
dotenv.config({ path: new URL('./.env', import.meta.url).pathname })

// Pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'renovaciones',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default pool
