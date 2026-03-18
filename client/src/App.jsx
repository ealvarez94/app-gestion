import { useAuth } from './hooks/useAuth'
import RenovacionesDashboardPage from './features/admin/renovaciones/pages/RenovacionesDashboardPage'
import LoginPage from './features/auth/pages/LoginPage'
import './styles/App.css'

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

  return isAuthenticated ? <RenovacionesDashboardPage /> : <LoginPage />
}

export default App
