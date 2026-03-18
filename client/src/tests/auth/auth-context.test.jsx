import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider } from '../../context/AuthContext'
import { useAuth } from '../../hooks/useAuth'

const { loginRequestMock } = vi.hoisted(() => ({
  loginRequestMock: vi.fn()
}))

vi.mock('../../features/auth/services/authService', () => ({
  loginRequest: loginRequestMock
}))

const TestConsumer = () => {
  const { user, isAuthenticated, loading, login, logout } = useAuth()

  return (
    <div>
      <span data-testid="loading">{loading ? 'true' : 'false'}</span>
      <span data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</span>
      <span data-testid="username">{user?.username || ''}</span>
      <button onClick={() => login('admin', 'secreta')}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  )
}

describe('AuthProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('carga sesión desde localStorage cuando existe token', async () => {
    localStorage.setItem('token', 'token-guardado')
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'admin' }))

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    expect(screen.getByTestId('username')).toHaveTextContent('admin')
  })

  it('limpia user inválido en localStorage', async () => {
    localStorage.setItem('token', 'token-guardado')
    localStorage.setItem('user', '{json-invalido')

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })

    expect(localStorage.getItem('user')).toBeNull()
    expect(screen.getByTestId('username')).toHaveTextContent('')
  })

  it('guarda sesión al hacer login correcto', async () => {
    loginRequestMock.mockResolvedValue({
      token: 'nuevo-token',
      user: { id: 1, username: 'admin' }
    })

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    fireEvent.click(screen.getByText('login'))

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })

    expect(localStorage.getItem('token')).toBe('nuevo-token')
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ id: 1, username: 'admin' }))
  })

  it('limpia la sesión al hacer logout', async () => {
    localStorage.setItem('token', 'token-guardado')
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'admin' }))

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })

    fireEvent.click(screen.getByText('logout'))

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    expect(localStorage.getItem('token')).toBeNull()
    expect(localStorage.getItem('user')).toBeNull()
  })
})
