import { useAuth } from '../../hooks/useAuth'
import Button from '../common/Button'
import logo from '../../assets/logotipo.png'
import './Layout.css'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <div className="header-brand">
            <img src={logo} alt="Logotipo de la aplicación" className="header-logo" />
            <div className="header-brand-copy">
              <h1 className="header-title">Oficina Digital</h1>
              <p className="header-subtitle">Panel administrativo</p>
            </div>
          </div>
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
