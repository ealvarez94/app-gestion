import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthContext } from '../../context/AuthContext'
import RenovacionesDashboardPage from '../../features/admin/renovaciones/pages/RenovacionesDashboardPage'

const {
  useRenovacionesMock
} = vi.hoisted(() => ({
  useRenovacionesMock: vi.fn()
}))

vi.mock('../../features/admin/renovaciones/hooks/useRenovaciones', () => ({
  useRenovaciones: useRenovacionesMock
}))

const renderDashboard = () => {
  return render(
    <AuthContext.Provider
      value={{
        user: { id: 1, username: 'admin' },
        token: 'token',
        isAuthenticated: true,
        login: vi.fn(),
        logout: vi.fn(),
        loading: false
      }}
    >
      <RenovacionesDashboardPage />
    </AuthContext.Provider>
  )
}

describe('RenovacionesDashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    window.alert = vi.fn()
    window.confirm = vi.fn(() => true)

    useRenovacionesMock.mockReturnValue({
      renovaciones: [{ id: 1, nombre_cliente: 'Acme', fecha_renovacion: '2026-03-18' }],
      totalFacturacion: '120.00',
      filter: { search: '', mes: '', year: '' },
      formData: {
        nombre_cliente: '',
        empresa: '',
        giro_bancario: 0,
        b_flag: 0,
        precio: '',
        fecha_renovacion: '',
        comentarios: '',
        servicios_contratados: '',
        telefono: '',
        email: ''
      },
      selectedIds: [],
      ipcPorcentaje: 3.5,
      showForm: false,
      loading: false,
      error: '',
      setFilter: vi.fn(),
      setIpcPorcentaje: vi.fn(),
      setShowForm: vi.fn(),
      updateFormField: vi.fn(),
      submitRenovacion: vi.fn(),
      removeRenovacion: vi.fn(),
      toggleRenovacionSelection: vi.fn(),
      toggleSelectAll: vi.fn(),
      applyIpc: vi.fn()
    })
  })

  it('renderiza el resumen y la tabla principal', () => {
    renderDashboard()

    expect(screen.getByText('Bienvenido, admin')).toBeInTheDocument()
    expect(screen.getByText('Total de Facturación')).toBeInTheDocument()
    expect(screen.getByText('Acme')).toBeInTheDocument()
  })

  it('muestra el error cuando el hook lo expone', () => {
    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      error: 'Error al cargar renovaciones'
    })

    renderDashboard()

    expect(screen.getByText('Error al cargar renovaciones')).toBeInTheDocument()
  })

  it('abre el formulario cuando showForm es true', () => {
    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      showForm: true
    })

    renderDashboard()

    expect(screen.getByText('Nombre Cliente*')).toBeInTheDocument()
    expect(screen.getByText('Crear Renovación')).toBeInTheDocument()
  })

  it('lanza la acción de aplicar IPC y muestra alerta de éxito', async () => {
    const user = userEvent.setup()
    const applyIpcMock = vi.fn().mockResolvedValue(undefined)

    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      selectedIds: [1],
      applyIpc: applyIpcMock
    })

    renderDashboard()

    await user.click(screen.getByRole('button', { name: 'Aplicar IPC' }))

    expect(applyIpcMock).toHaveBeenCalled()
    expect(window.alert).toHaveBeenCalledWith('IPC del 3.5% aplicado exitosamente')
  })
})
