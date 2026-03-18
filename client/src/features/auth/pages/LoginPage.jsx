import { useState } from 'react'
import Button from '../../../components/common/Button'
import Input from '../../../components/common/Input'
import { useAuth } from '../../../hooks/useAuth'
import logo from '../../../assets/logotipo.png'
import './LoginPage.css'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(username, password)
      if (!result.success) {
        setError(result.error)
      }
    } catch {
      setError('Error al conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo" className="login-logo" />
          <h1>Gestión de Renovaciones</h1>
          <p>Inicia sesión para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <Input
            type="text"
            id="username"
            label="Usuario"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Ingresa tu usuario"
            required
            disabled={loading}
          />

          <Input
            type="password"
            id="password"
            label="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            disabled={loading}
          />

          <Button
            type="submit"
            className="btn-login"
            disabled={loading}
            loading={loading}
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="login-footer">
          <p><strong>Credenciales por defecto:</strong></p>
          <p>Usuario: <code>admin</code></p>
          <p>Contraseña: <code>nuevaClave123</code></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
