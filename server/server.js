dotenv.config()

import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import pool from './db.js'
import { authenticateToken, generateToken } from './auth.js'

// Fuerza la carga del .env desde la carpeta actual del proyecto
dotenv.config({ path: new URL('./.env', import.meta.url).pathname })

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// ==================== RUTAS DE AUTENTICACIÓN ====================

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña requeridos' })
    }

    const connection = await pool.getConnection()
    const [users] = await connection.execute(
      'SELECT id, username, password_hash FROM usuarios WHERE username = ?',
      [username]
    )
    connection.release()

    if (users.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    const user = users[0]
    const validPassword = await bcrypt.compare(password, user.password_hash)

    if (!validPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })
    }

    const token = generateToken(user.id, user.username)
    res.json({ 
      token, 
      user: { id: user.id, username: user.username },
      mensaje: 'Login exitoso' 
    })
  } catch (error) {
    console.error('Error en login:', error)
    res.status(500).json({ error: 'Error en el servidor' })
  }
})

// Verificar token
app.get('/auth/verify', authenticateToken, (req, res) => {
  res.json({ 
    valid: true, 
    user: req.user,
    mensaje: 'Token válido' 
  })
})

// ==================== RUTAS DE RENOVACIONES ====================

// Obtener todas las renovaciones con búsqueda y filtros
app.get('/api/renovaciones', authenticateToken, async (req, res) => {
  try {
    const { search, mes, year } = req.query
    
    let query = 'SELECT * FROM w47fa_iv_clientes_renovaciones WHERE 1=1'
    const params = []

    // Búsqueda por nombre, empresa o email
    if (search) {
      query += ` AND (nombre_cliente LIKE ? OR empresa LIKE ? OR email LIKE ? OR telefono LIKE ?)`
      const searchParam = `%${search}%`
      params.push(searchParam, searchParam, searchParam, searchParam)
    }

    // Filtro por mes
    if (mes) {
      const mesNum = parseInt(mes).toString().padStart(2, '0')
      query += ` AND MONTH(fecha_renovacion) = ?`
      params.push(parseInt(mes))
    }

    // Filtro por año
    if (year) {
      query += ` AND YEAR(fecha_renovacion) = ?`
      params.push(parseInt(year))
    }

    query += ' ORDER BY fecha_renovacion DESC'

    const connection = await pool.getConnection()
    const [renovaciones] = await connection.execute(query, params)
    
    // Calcular total de facturación
    const totalQuery = 'SELECT SUM(precio) as total FROM w47fa_iv_clientes_renovaciones WHERE precio IS NOT NULL'
    const [totals] = await connection.execute(totalQuery)
    const totalFacturacion = totals[0]?.total || 0

    connection.release()

    res.json({
      renovaciones,
      totalFacturacion: parseFloat(totalFacturacion).toFixed(2),
      count: renovaciones.length
    })
  } catch (error) {
    console.error('Error al obtener renovaciones:', error)
    res.status(500).json({ error: 'Error al obtener renovaciones' })
  }
})

// Obtener renovación por ID
app.get('/api/renovaciones/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    const connection = await pool.getConnection()
    const [renovaciones] = await connection.execute(
      'SELECT * FROM w47fa_iv_clientes_renovaciones WHERE id = ?',
      [id]
    )
    connection.release()

    if (renovaciones.length === 0) {
      return res.status(404).json({ error: 'Renovación no encontrada' })
    }

    res.json(renovaciones[0])
  } catch (error) {
    console.error('Error al obtener renovación:', error)
    res.status(500).json({ error: 'Error al obtener renovación' })
  }
})

// Crear nueva renovación
app.post('/api/renovaciones', authenticateToken, async (req, res) => {
  try {
    const {
      nombre_cliente,
      empresa,
      giro_bancario = 0,
      b_flag = 0,
      precio,
      fecha_renovacion,
      comentarios = '',
      servicios_contratados = '',
      telefono = '',
      email = ''
    } = req.body

    if (!nombre_cliente || !fecha_renovacion || !email) {
      return res.status(400).json({ 
        error: 'Nombre cliente, fecha renovación y email son requeridos' 
      })
    }

    const connection = await pool.getConnection()
    const [result] = await connection.execute(
      `INSERT INTO w47fa_iv_clientes_renovaciones 
       (nombre_cliente, empresa, giro_bancario, b_flag, precio, fecha_renovacion, 
        comentarios, servicios_contratados, telefono, email)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre_cliente, empresa, giro_bancario, b_flag, precio, fecha_renovacion,
       comentarios, servicios_contratados, telefono, email]
    )
    connection.release()

    res.status(201).json({
      id: result.insertId,
      nombre_cliente,
      empresa,
      giro_bancario,
      b_flag,
      precio,
      fecha_renovacion,
      comentarios,
      servicios_contratados,
      telefono,
      email,
      mensaje: 'Renovación creada exitosamente'
    })
  } catch (error) {
    console.error('Error al crear renovación:', error)
    res.status(500).json({ error: 'Error al crear renovación' })
  }
})

// Actualizar renovación
app.put('/api/renovaciones/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No hay datos para actualizar' })
    }

    const fields = []
    const values = []

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`)
        values.push(value)
      }
    })

    values.push(id)

    const connection = await pool.getConnection()
    const [result] = await connection.execute(
      `UPDATE w47fa_iv_clientes_renovaciones SET ${fields.join(', ')} WHERE id = ?`,
      values
    )

    if (result.affectedRows === 0) {
      connection.release()
      return res.status(404).json({ error: 'Renovación no encontrada' })
    }

    const [renovacion] = await connection.execute(
      'SELECT * FROM w47fa_iv_clientes_renovaciones WHERE id = ?',
      [id]
    )
    connection.release()

    res.json({
      renovacion: renovacion[0],
      mensaje: 'Renovación actualizada exitosamente'
    })
  } catch (error) {
    console.error('Error al actualizar renovación:', error)
    res.status(500).json({ error: 'Error al actualizar renovación' })
  }
})

// Eliminar renovación
app.delete('/api/renovaciones/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const connection = await pool.getConnection()
    const [result] = await connection.execute(
      'DELETE FROM w47fa_iv_clientes_renovaciones WHERE id = ?',
      [id]
    )

    if (result.affectedRows === 0) {
      connection.release()
      return res.status(404).json({ error: 'Renovación no encontrada' })
    }

    connection.release()

    res.json({ 
      mensaje: 'Renovación eliminada exitosamente',
      id
    })
  } catch (error) {
    console.error('Error al eliminar renovación:', error)
    res.status(500).json({ error: 'Error al eliminar renovación' })
  }
})

// Aplicar IPC a múltiples renovaciones
app.post('/api/renovaciones/aplicar-ipc', authenticateToken, async (req, res) => {
  try {
    const { ids, porcentaje = 3.5 } = req.body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: 'Se requiere un array de IDs' })
    }

    const connection = await pool.getConnection()
    const placeholders = ids.map(() => '?').join(',')

    const query = `
      UPDATE w47fa_iv_clientes_renovaciones 
      SET precio = precio * (1 + ? / 100)
      WHERE id IN (${placeholders})
    `

    const [result] = await connection.execute(
      query,
      [porcentaje, ...ids]
    )

    // Obtener datos actualizados
    const [renovaciones] = await connection.execute(
      `SELECT * FROM w47fa_iv_clientes_renovaciones WHERE id IN (${placeholders})`,
      ids
    )

    connection.release()

    res.json({
      mensaje: `IPC del ${porcentaje}% aplicado a ${result.affectedRows} renovaciones`,
      renovacionesActualizadas: renovaciones
    })
  } catch (error) {
    console.error('Error al aplicar IPC:', error)
    res.status(500).json({ error: 'Error al aplicar IPC' })
  }
})

// Obtener estadísticas por mes
app.get('/api/estadisticas/mes', authenticateToken, async (req, res) => {
  try {
    const connection = await pool.getConnection()
    const [stats] = await connection.execute(`
      SELECT 
        MONTH(fecha_renovacion) as mes,
        YEAR(fecha_renovacion) as year,
        COUNT(*) as cantidad,
        SUM(precio) as total,
        AVG(precio) as promedio
      FROM w47fa_iv_clientes_renovaciones
      GROUP BY YEAR(fecha_renovacion), MONTH(fecha_renovacion)
      ORDER BY YEAR(fecha_renovacion) DESC, MONTH(fecha_renovacion) DESC
    `)
    connection.release()

    const estadisticas = stats.map(stat => ({
      ...stat,
      total: parseFloat(stat.total || 0).toFixed(2),
      promedio: parseFloat(stat.promedio || 0).toFixed(2)
    }))

    res.json(estadisticas)
  } catch (error) {
    console.error('Error al obtener estadísticas:', error)
    res.status(500).json({ error: 'Error al obtener estadísticas' })
  }
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', mensaje: 'Servidor funcionando correctamente' })
})

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`)
  console.log(`📝 API disponible en http://localhost:${PORT}/api/renovaciones`)
  console.log(`🔐 Autenticación en http://localhost:${PORT}/auth/login`)
})
