import mysql from 'mysql2/promise'
import { env } from './src/config/env.js'

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD
  })

  try {
    // Crear base de datos si no existe
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${env.DB_NAME}`)
    console.log(`Base de datos "${env.DB_NAME}" lista`)

    // Cambiar a la BD
    await connection.execute(`USE ${env.DB_NAME}`)

    // Crear tabla de usuarios si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Tabla usuarios lista')

    console.log('Base de datos inicializada correctamente')
  } catch (error) {
    console.error('Error al inicializar BD:', error.message)
  } finally {
    await connection.end()
  }
}

// Ejecutar si se llama directamente
initializeDatabase()
