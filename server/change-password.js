import bcrypt from 'bcryptjs'
import pool from './db.js'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function question(prompt) {
  return new Promise(resolve => {
    rl.question(prompt, resolve)
  })
}

async function changePassword() {
  try {
    const newPassword = await question('Ingresa nueva contraseña: ')
    
    if (newPassword.length < 6) {
      console.log('❌ La contraseña debe tener al menos 6 caracteres')
      rl.close()
      return
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    const connection = await pool.getConnection()
    
    const [result] = await connection.execute(
      'UPDATE usuarios SET password_hash = ? WHERE username = ?',
      [hashedPassword, 'admin']
    )
    
    connection.release()
    
    if (result.affectedRows > 0) {
      console.log('✅ Contraseña actualizada correctamente')
    } else {
      console.log('❌ Usuario admin no encontrado')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    rl.close()
  }
}

changePassword()
