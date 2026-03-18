import { useEffect, useRef } from 'react'
import FacturacionSummary from '../components/FacturacionSummary'
import IpcPanel from '../components/IpcPanel'
import RenovacionForm from '../components/RenovacionForm'
import RenovacionesFilters from '../components/RenovacionesFilters'
import RenovacionesTable from '../components/RenovacionesTable'
import { useRenovaciones } from '../hooks/useRenovaciones'
import './RenovacionesDashboardPage.css'
import Layout from '../../../../components/layout/Layout'
import Button from '../../../../components/common/Button'

function RenovacionesDashboardPage() {
  const {
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
    hideForm,
    startCreatingRenovacion,
    startEditingRenovacion
  } = useRenovaciones()
  const formContainerRef = useRef(null)

  useEffect(() => {
    if (!showForm || !formContainerRef.current) {
      return
    }

    requestAnimationFrame(() => {
      formContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }, [showForm])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await submitRenovacion()
    } catch (err) {
      console.error('Error al guardar renovación:', err)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta renovación?')) {
      try {
        await removeRenovacion(id)
      } catch (err) {
        console.error('Error al eliminar renovación:', err)
      }
    }
  }

  const handleAplicarIPC = async () => {
    try {
      await applyIpc()
      alert(`IPC del ${ipcPorcentaje}% aplicado exitosamente`)
    } catch (err) {
      if (err.message === 'Selecciona al menos una renovación') {
        alert(err.message)
        return
      }

      console.error('Error al aplicar IPC:', err)
    }
  }

  return (
    <Layout>
      <div className="dashboard">
        {error && <div className="error-message">{error}</div>}

        <FacturacionSummary
          overallSummary={overallSummary}
          filteredSummary={filteredSummary}
        />

        <RenovacionesFilters
          filter={filter}
          onFilterChange={(partialFilter) => {
            setFilter((currentFilter) => ({ ...currentFilter, ...partialFilter }))
          }}
        />

        <IpcPanel
          selectedCount={selectedIds.length}
          ipcPorcentaje={ipcPorcentaje}
          onIpcChange={setIpcPorcentaje}
          onApplyIpc={handleAplicarIPC}
        />

        <Button
          onClick={() => {
            if (showForm) {
              hideForm()
              return
            }

            startCreatingRenovacion()
          }}
          variant="primary"
        >
          {showForm ? '✖ Cancelar' : '➕ Nueva Renovación'}
        </Button>

        {showForm && (
          <div ref={formContainerRef} className="renovacion-form-wrapper">
            <RenovacionForm
              formData={formData}
              isEditing={Boolean(editingRenovacionId)}
              onCancel={hideForm}
              onInputChange={(event) => updateFormField(event.target)}
              onSubmit={handleSubmit}
            />
          </div>
        )}

        <RenovacionesTable
          renovaciones={renovaciones}
          loading={loading}
          selectedIds={selectedIds}
          onEdit={startEditingRenovacion}
          onToggleSelectAll={toggleSelectAll}
          onToggleSelection={toggleRenovacionSelection}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  )
}

export default RenovacionesDashboardPage
