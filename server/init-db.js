dotenv.config()

import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Fuerza la carga del .env desde la carpeta actual del proyecto
dotenv.config({ path: new URL('./.env', import.meta.url).pathname })

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  })

  try {
    // Crear base de datos si no existe
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    console.log(`✅ Base de datos "${process.env.DB_NAME}" lista`)

    // Cambiar a la BD
    await connection.execute(`USE ${process.env.DB_NAME}`)

    // Crear tabla de usuarios si no existe
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('✅ Tabla usuarios lista')

    // Crear usuario por defecto si no existe
    const [users] = await connection.execute(
      'SELECT * FROM usuarios WHERE username = ?',
      ['admin']
    )

    if (users.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await connection.execute(
        'INSERT INTO usuarios (username, password_hash) VALUES (?, ?)',
        ['admin', hashedPassword]
      )
      console.log('✅ Usuario admin creado (contraseña: admin123)')
    } else {
      console.log('✅ Usuario admin ya existe')
    }

    console.log('✅ Base de datos inicializada correctamente')
  } catch (error) {
    console.error('❌ Error al inicializar BD:', error.message)
  } finally {
    await connection.end()
  }
}

// Ejecutar si se llama directamente
initializeDatabase()
