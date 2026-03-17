import { useAuth } from './AuthContext'
import Login from './Login'
import Dashboard from './Dashboard'
import './App.css'

function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#E35554'
      }}>
        Cargando...
      </div>
    )
  }

  return isAuthenticated ? <Dashboard /> : <Login />
}

export default App
