import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import LoginPage from '../../features/auth/pages/LoginPage'
import { renderWithAuth } from '../utils/render-with-auth'

const { loginRequestMock } = vi.hoisted(() => ({
  loginRequestMock: vi.fn()
}))

vi.mock('../../features/auth/services/authService', () => ({
  loginRequest: loginRequestMock
}))

describe('LoginPage', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('muestra error cuando el login falla', async () => {
    const user = userEvent.setup()

    loginRequestMock.mockRejectedValue({
      response: {
        data: {
          error: 'Usuario o contraseña incorrectos'
        }
      }
    })

    renderWithAuth(<LoginPage />)

    await user.type(screen.getByLabelText('Usuario'), 'admin')
    await user.type(screen.getByLabelText('Contraseña'), 'incorrecta')
    await user.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    expect(await screen.findByText('Usuario o contraseña incorrectos')).toBeInTheDocument()
  })

  it('deshabilita el formulario mientras procesa el login', async () => {
    const user = userEvent.setup()

    let resolveLogin
    loginRequestMock.mockImplementation(
      () => new Promise((resolve) => {
        resolveLogin = resolve
      })
    )

    renderWithAuth(<LoginPage />)

    await user.type(screen.getByLabelText('Usuario'), 'admin')
    await user.type(screen.getByLabelText('Contraseña'), 'secreta')
    await user.click(screen.getByRole('button', { name: 'Iniciar Sesión' }))

    await waitFor(() => {
      expect(screen.getByLabelText('Usuario')).toBeDisabled()
      expect(screen.getByLabelText('Contraseña')).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Cargando...' })).toBeDisabled()
    })

    resolveLogin({
      token: 'token-ok',
      user: { id: 1, username: 'admin' }
    })

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('token-ok')
    })
  })
})
