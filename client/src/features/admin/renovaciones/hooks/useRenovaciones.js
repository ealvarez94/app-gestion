import { useEffect, useMemo, useState } from 'react'
import {
  DEFAULT_IPC_PERCENTAGE,
  INITIAL_FILTERS
} from '../constants'
import {
  buildRenovacionFormFromData,
  getEmptyRenovacionForm
} from '../utils'
import {
  applyRenovacionesIpc,
  createRenovacion,
  deleteRenovacion,
  getRenovaciones,
  updateRenovacion
} from '../services/renovacionesService'

export const useRenovaciones = () => {
  const [renovaciones, setRenovaciones] = useState([])
  const [overallSummary, setOverallSummary] = useState({
    totalFacturacion: 0,
    renovacionesCount: 0
  })
  const [filter, setFilter] = useState(INITIAL_FILTERS)
  const [formData, setFormData] = useState(getEmptyRenovacionForm)
  const [selectedIds, setSelectedIds] = useState([])
  const [ipcPorcentaje, setIpcPorcentaje] = useState(DEFAULT_IPC_PERCENTAGE)
  const [showForm, setShowForm] = useState(false)
  const [editingRenovacionId, setEditingRenovacionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadRenovaciones = async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getRenovaciones(filter)
      setRenovaciones(data.renovaciones)
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar renovaciones')
    } finally {
      setLoading(false)
    }
  }

  const loadOverallSummary = async () => {
    try {
      const data = await getRenovaciones(INITIAL_FILTERS)

      setOverallSummary({
        totalFacturacion: Number.parseFloat(data.totalFacturacion || 0),
        renovacionesCount: data.renovaciones.length
      })
    } catch (err) {
      setError((currentError) => currentError || 'Error al cargar renovaciones')
    }
  }

  useEffect(() => {
    setSelectedIds([])
    loadRenovaciones()
  }, [filter])

  useEffect(() => {
    loadOverallSummary()
  }, [])

  const updateFormField = ({ name, value, type, checked }) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    }))
  }

  const resetForm = () => {
    setFormData(getEmptyRenovacionForm())
  }

  const hideForm = () => {
    setShowForm(false)
    setEditingRenovacionId(null)
    resetForm()
  }

  const startCreatingRenovacion = () => {
    setEditingRenovacionId(null)
    resetForm()
    setShowForm(true)
  }

  const startEditingRenovacion = (renovacion) => {
    setEditingRenovacionId(renovacion.id)
    setFormData(buildRenovacionFormFromData(renovacion))
    setShowForm(true)
  }

  const submitRenovacion = async () => {
    if (editingRenovacionId) {
      await updateRenovacion(editingRenovacionId, formData)
    } else {
      await createRenovacion(formData)
    }

    hideForm()
    await Promise.all([loadRenovaciones(), loadOverallSummary()])
  }

  const removeRenovacion = async (id) => {
    await deleteRenovacion(id)
    setSelectedIds((currentIds) => currentIds.filter((currentId) => currentId !== id))
    await Promise.all([loadRenovaciones(), loadOverallSummary()])
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
    await Promise.all([loadRenovaciones(), loadOverallSummary()])
  }

  const filteredSummary = useMemo(() => {
    const total = renovaciones.reduce((accumulator, renovacion) => {
      return accumulator + Number.parseFloat(renovacion.precio || 0)
    }, 0)

    return {
      totalFacturacion: total,
      renovacionesCount: renovaciones.length
    }
  }, [renovaciones])

  return {
    renovaciones,
    overallSummary,
    filteredSummary,
    filter,
    formData,
    selectedIds,
    ipcPorcentaje,
    showForm,
    editingRenovacionId,
    loading,
    error,
    setFilter,
    setIpcPorcentaje,
    updateFormField,
    submitRenovacion,
    removeRenovacion,
    toggleRenovacionSelection,
    toggleSelectAll,
    applyIpc,
    resetForm,
    loadRenovaciones,
    hideForm,
    startCreatingRenovacion,
    startEditingRenovacion
  }
}
