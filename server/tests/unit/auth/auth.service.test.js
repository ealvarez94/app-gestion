import { beforeEach, describe, expect, it, vi } from 'vitest'

process.env.JWT_SECRET = 'test-secret'

const compareMock = vi.fn()
const signMock = vi.fn()
const findUserByUsernameMock = vi.fn()

vi.mock('bcryptjs', () => ({
  default: {
    compare: compareMock
  }
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: signMock
  }
}))

vi.mock('../../../src/modules/users/users.repository.js', () => ({
  findUserByUsername: findUserByUsernameMock
}))

const { ApiError } = await import('../../../src/shared/errors/api-error.js')
const { loginUser } = await import('../../../src/modules/auth/auth.service.js')

describe('auth.service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('lanza 400 si faltan credenciales', async () => {
    await expect(loginUser({ username: '', password: '' })).rejects.toMatchObject({
      statusCode: 400,
      message: 'Usuario y contraseña requeridos'
    })
  })

  it('lanza 401 si el usuario no existe', async () => {
    findUserByUsernameMock.mockResolvedValue(null)

    await expect(loginUser({ username: 'admin', password: '123456' })).rejects.toMatchObject({
      statusCode: 401,
      message: 'Usuario o contraseña incorrectos'
    })
  })

  it('lanza 401 si la contraseña no es válida', async () => {
    findUserByUsernameMock.mockResolvedValue({
      id: 1,
      username: 'admin',
      password_hash: 'hashed-password'
    })
    compareMock.mockResolvedValue(false)

    const loginPromise = loginUser({ username: 'admin', password: 'mal' })

    await expect(loginPromise).rejects.toBeInstanceOf(ApiError)
    await expect(loginPromise).rejects.toMatchObject({
      statusCode: 401,
      message: 'Usuario o contraseña incorrectos'
    })
  })

  it('devuelve token y usuario cuando el login es correcto', async () => {
    findUserByUsernameMock.mockResolvedValue({
      id: 1,
      username: 'admin',
      password_hash: 'hashed-password'
    })
    compareMock.mockResolvedValue(true)
    signMock.mockReturnValue('signed-token')

    const result = await loginUser({ username: 'admin', password: 'correcta' })

    expect(compareMock).toHaveBeenCalledWith('correcta', 'hashed-password')
    expect(signMock).toHaveBeenCalledWith(
      { userId: 1, username: 'admin' },
      'test-secret',
      { expiresIn: '24h' }
    )
    expect(result).toEqual({
      token: 'signed-token',
      user: { id: 1, username: 'admin' },
      mensaje: 'Login exitoso'
    })
  })
})
