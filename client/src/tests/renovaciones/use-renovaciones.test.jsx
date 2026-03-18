import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useRenovaciones } from '../../features/admin/renovaciones/hooks/useRenovaciones'

const {
  getRenovacionesMock,
  createRenovacionMock,
  deleteRenovacionMock,
  applyRenovacionesIpcMock
} = vi.hoisted(() => ({
  getRenovacionesMock: vi.fn(),
  createRenovacionMock: vi.fn(),
  deleteRenovacionMock: vi.fn(),
  applyRenovacionesIpcMock: vi.fn()
}))

vi.mock('../../features/admin/renovaciones/services/renovacionesService', () => ({
  getRenovaciones: getRenovacionesMock,
  createRenovacion: createRenovacionMock,
  deleteRenovacion: deleteRenovacionMock,
  applyRenovacionesIpc: applyRenovacionesIpcMock
}))

describe('useRenovaciones', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    getRenovacionesMock.mockResolvedValue({
      renovaciones: [
        { id: 1, nombre_cliente: 'Acme' },
        { id: 2, nombre_cliente: 'Globex' }
      ],
      totalFacturacion: '300.00'
    })
  })

  it('carga renovaciones al montar el hook', async () => {
    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(getRenovacionesMock).toHaveBeenCalledWith({
      search: '',
      mes: '',
      year: ''
    })
    expect(result.current.renovaciones).toHaveLength(2)
    expect(result.current.totalFacturacion).toBe('300.00')
  })

  it('actualiza el formulario correctamente para inputs normales y checkboxes', async () => {
    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.updateFormField({
        name: 'nombre_cliente',
        value: 'Cliente Nuevo',
        type: 'text'
      })
      result.current.updateFormField({
        name: 'giro_bancario',
        checked: true,
        type: 'checkbox'
      })
    })

    expect(result.current.formData.nombre_cliente).toBe('Cliente Nuevo')
    expect(result.current.formData.giro_bancario).toBe(1)
  })

  it('envía una nueva renovación, reinicia el formulario y recarga datos', async () => {
    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.setShowForm(true)
      result.current.updateFormField({
        name: 'nombre_cliente',
        value: 'Cliente Nuevo',
        type: 'text'
      })
      result.current.updateFormField({
        name: 'fecha_renovacion',
        value: '2026-03-18',
        type: 'date'
      })
      result.current.updateFormField({
        name: 'email',
        value: 'cliente@nuevo.com',
        type: 'email'
      })
    })

    await act(async () => {
      await result.current.submitRenovacion()
    })

    expect(createRenovacionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        nombre_cliente: 'Cliente Nuevo',
        fecha_renovacion: '2026-03-18',
        email: 'cliente@nuevo.com'
      })
    )
    expect(result.current.showForm).toBe(false)
    expect(result.current.formData.nombre_cliente).toBe('')
    expect(getRenovacionesMock).toHaveBeenCalledTimes(2)
  })

  it('lanza error al aplicar IPC sin elementos seleccionados', async () => {
    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    await expect(result.current.applyIpc()).rejects.toThrow(
      'Selecciona al menos una renovación'
    )
  })

  it('aplica IPC con ids seleccionados y vuelve a cargar renovaciones', async () => {
    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.toggleRenovacionSelection(1)
      result.current.toggleRenovacionSelection(2)
      result.current.setIpcPorcentaje(4.5)
    })

    await act(async () => {
      await result.current.applyIpc()
    })

    expect(applyRenovacionesIpcMock).toHaveBeenCalledWith({
      ids: [1, 2],
      porcentaje: 4.5
    })
    expect(result.current.selectedIds).toEqual([])
    expect(getRenovacionesMock).toHaveBeenCalledTimes(2)
  })

  it('expone un error legible si falla la carga inicial', async () => {
    getRenovacionesMock.mockRejectedValueOnce({
      response: {
        data: {
          error: 'Error controlado'
        }
      }
    })

    const { result } = renderHook(() => useRenovaciones())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Error controlado')
  })
})
