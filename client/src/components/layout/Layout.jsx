import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import './Layout.css'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Gestión de Renovaciones</h1>
          <div className="header-user">
            <span>Bienvenido, {user?.username}</span>
            <Button
              variant="secondary"
              size="small"
              onClick={logout}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout