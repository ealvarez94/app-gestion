import { useEffect, useState } from 'react'
import {
  DEFAULT_IPC_PERCENTAGE,
  INITIAL_FILTERS
} from '../constants'
import { getEmptyRenovacionForm } from '../utils'
import {
  applyRenovacionesIpc,
  createRenovacion,
  deleteRenovacion,
  getRenovaciones
} from '../services/renovacionesService'

export const useRenovaciones = () => {
  const [renovaciones, setRenovaciones] = useState([])
  const [totalFacturacion, setTotalFacturacion] = useState(0)
  const [filter, setFilter] = useState(INITIAL_FILTERS)
  const [formData, setFormData] = useState(getEmptyRenovacionForm)
  const [selectedIds, setSelectedIds] = useState([])
  const [ipcPorcentaje, setIpcPorcentaje] = useState(DEFAULT_IPC_PERCENTAGE)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadRenovaciones = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getRenovaciones(filter)
      setRenovaciones(data.renovaciones)
      setTotalFacturacion(data.totalFacturacion)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar renovaciones')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadRenovaciones()
  }, [filter])

  const updateFormField = ({ name, value, type, checked }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }))
  }

  const resetForm = () => {
    setFormData(getEmptyRenovacionForm())
  }

  const submitRenovacion = async () => {
    await createRenovacion(formData)
    resetForm()
    setShowForm(false)
    await loadRenovaciones()
  }

  const removeRenovacion = async (id) => {
    await deleteRenovacion(id)
    setSelectedIds((currentIds) => currentIds.filter((currentId) => currentId !== id))
    await loadRenovaciones()
  }

  const toggleRenovacionSelection = (id) => {
    setSelectedIds((currentIds) => (
      currentIds.includes(id)
        ? currentIds.filter((currentId) => currentId !== id)
        : [...currentIds, id]
    ))
  }

  const toggleSelectAll = (checked) => {
    setSelectedIds(checked ? renovaciones.map((renovacion) => renovacion.id) : [])
  }

  const applyIpc = async () => {
    if (selectedIds.length === 0) {
      throw new Error('Selecciona al menos una renovación')
    }

    await applyRenovacionesIpc({
      ids: selectedIds,
      porcentaje: ipcPorcentaje
    })

    setSelectedIds([])
    await loadRenovaciones()
  }

  return {
    renovaciones,
    totalFacturacion,
    filter,
    formData,
    selectedIds,
    ipcPorcentaje,
    showForm,
    loading,
    error,
    setFilter,
    setIpcPorcentaje,
    setShowForm,
    updateFormField,
    submitRenovacion,
    removeRenovacion,
    toggleRenovacionSelection,
    toggleSelectAll,
    applyIpc,
    resetForm,
    loadRenovaciones
  }
}
