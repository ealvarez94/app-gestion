import { render } from '@testing-library/react'
import { AuthProvider } from '../../context/AuthContext'

export const renderWithAuth = (ui) => {
  return render(
    <AuthProvider>
      {ui}
    </AuthProvider>
  )
}
