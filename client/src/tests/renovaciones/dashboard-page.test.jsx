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
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
    window.requestAnimationFrame = vi.fn((callback) => {
      callback()
      return 1
    })

    useRenovacionesMock.mockReturnValue({
      renovaciones: [{
        id: 1,
        nombre_cliente: 'Acme',
        empresa: 'Acme Corp',
        servicios_contratados: 'Hosting',
        fecha_renovacion: '2026-03-18',
        precio: '120.00',
        email: 'acme@example.com',
        telefono: '123456789',
        giro_bancario: 1,
        b_flag: 0,
        comentarios: 'Cliente prioritario'
      }],
      overallSummary: {
        totalFacturacion: 12847,
        renovacionesCount: 1234
      },
      filteredSummary: {
        totalFacturacion: 120,
        renovacionesCount: 1
      },
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
      editingRenovacionId: null,
      loading: false,
      error: '',
      setFilter: vi.fn(),
      setIpcPorcentaje: vi.fn(),
      updateFormField: vi.fn(),
      submitRenovacion: vi.fn(),
      removeRenovacion: vi.fn(),
      toggleRenovacionSelection: vi.fn(),
      toggleSelectAll: vi.fn(),
      applyIpc: vi.fn(),
      hideForm: vi.fn(),
      startCreatingRenovacion: vi.fn(),
      startEditingRenovacion: vi.fn()
    })
  })

  it('renderiza el resumen y la tabla principal', () => {
    renderDashboard()

    expect(screen.getByText('Bienvenido, admin')).toBeInTheDocument()
    expect(screen.getByText('Total general')).toBeInTheDocument()
    expect(screen.getByText('Resultado actual')).toBeInTheDocument()
    expect(screen.getByText('12.847,00')).toBeInTheDocument()
    expect(screen.getByText('1.234 renovaciones')).toBeInTheDocument()
    expect(screen.getByText('120,00')).toBeInTheDocument()
    expect(screen.getByText('Acme')).toBeInTheDocument()
    expect(screen.getByText('Hosting')).toBeInTheDocument()
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

  it('hace scroll suave al formulario cuando se abre', () => {
    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      showForm: true
    })

    renderDashboard()

    expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start'
    })
  })

  it('muestra el formulario en modo edición cuando hay una renovación activa', () => {
    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      showForm: true,
      editingRenovacionId: 1
    })

    renderDashboard()

    expect(screen.getByText('Guardar Cambios')).toBeInTheDocument()
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

  it('lanza la acción de editar desde la tabla', async () => {
    const user = userEvent.setup()
    const startEditingRenovacionMock = vi.fn()

    useRenovacionesMock.mockReturnValueOnce({
      ...useRenovacionesMock(),
      startEditingRenovacion: startEditingRenovacionMock
    })

    renderDashboard()

    await user.click(screen.getByRole('button', { name: 'Editar Acme' }))

    expect(startEditingRenovacionMock).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      nombre_cliente: 'Acme',
      empresa: 'Acme Corp',
      servicios_contratados: 'Hosting',
      fecha_renovacion: '2026-03-18'
    }))
  })

  it('muestra la información ampliada al desplegar un cliente', async () => {
    const user = userEvent.setup()

    renderDashboard()

    await user.click(screen.getByRole('button', { name: 'Ver detalle de Acme' }))

    expect(screen.getByText('acme@example.com')).toBeInTheDocument()
    expect(screen.getByText('123456789')).toBeInTheDocument()
    expect(screen.getByText('Cliente prioritario')).toBeInTheDocument()
    expect(screen.getByText('Sí')).toBeInTheDocument()
  })
})
