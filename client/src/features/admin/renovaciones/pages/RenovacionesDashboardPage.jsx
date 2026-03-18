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
    applyIpc
  } = useRenovaciones()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await submitRenovacion()
    } catch (err) {
      console.error('Error al crear renovación:', err)
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
          totalFacturacion={totalFacturacion}
          renovacionesCount={renovaciones.length}
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
          onClick={() => setShowForm(!showForm)}
          variant="primary"
        >
          {showForm ? '✖ Cancelar' : '➕ Nueva Renovación'}
        </Button>

        {showForm && (
          <RenovacionForm
            formData={formData}
            onInputChange={(event) => updateFormField(event.target)}
            onSubmit={handleSubmit}
          />
        )}

        <RenovacionesTable
          renovaciones={renovaciones}
          loading={loading}
          selectedIds={selectedIds}
          onToggleSelectAll={toggleSelectAll}
          onToggleSelection={toggleRenovacionSelection}
          onDelete={handleDelete}
        />
      </div>
    </Layout>
  )
}

export default RenovacionesDashboardPage
