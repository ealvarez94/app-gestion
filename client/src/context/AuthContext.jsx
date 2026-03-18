import React, { createContext, useState, useEffect } from 'react'
import { loginRequest } from '../features/auth/services/authService'

export const AuthContext = createContext()

const getStoredUser = () => {
  const savedUser = localStorage.getItem('user')

  if (!savedUser) {
    return null
  }

  try {
    return JSON.parse(savedUser)
  } catch {
    localStorage.removeItem('user')
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = getStoredUser()

    if (savedToken) {
      setToken(savedToken)
      setUser(savedUser)
    } else {
      setUser(null)
    }

    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const data = await loginRequest({ username, password })
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || 'Error al iniciar sesión'
      }
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
