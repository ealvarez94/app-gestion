import { useState, useEffect } from 'react'
import api from './api'
import { useAuth } from './AuthContext'
import './Dashboard.css'

function Dashboard() {
  const { user, logout } = useAuth()
  const [renovaciones, setRenovaciones] = useState([])
  const [totalFacturacion, setTotalFacturacion] = useState(0)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState({ search: '', mes: '', year: '' })
  const [formData, setFormData] = useState({
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
  })
  const [selectedIds, setSelectedIds] = useState([])
  const [ipcPorcentaje, setIpcPorcentaje] = useState(3.5)
  const [showForm, setShowForm] = useState(false)

  // Cargar renovaciones
  const cargarRenovaciones = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter.search) params.append('search', filter.search)
      if (filter.mes) params.append('mes', filter.mes)
      if (filter.year) params.append('year', filter.year)

      const response = await api.get(`/api/renovaciones?${params.toString()}`)
      setRenovaciones(response.data.renovaciones)
      setTotalFacturacion(response.data.totalFacturacion)
    } catch (error) {
      console.error('Error al cargar renovaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarRenovaciones()
  }, [filter])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/renovaciones', formData)
      setFormData({
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
      })
      setShowForm(false)
      cargarRenovaciones()
    } catch (error) {
      console.error('Error al crear renovación:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que deseas eliminar esta renovación?')) {
      try {
        await api.delete(`/api/renovaciones/${id}`)
        cargarRenovaciones()
      } catch (error) {
        console.error('Error al eliminar renovación:', error)
      }
    }
  }

  const handleSelectRenovacion = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const handleAplicarIPC = async () => {
    if (selectedIds.length === 0) {
      alert('Selecciona al menos una renovación')
      return
    }

    try {
      await api.post('/api/renovaciones/aplicar-ipc', {
        ids: selectedIds,
        porcentaje: ipcPorcentaje
      })
      setSelectedIds([])
      cargarRenovaciones()
      alert(`IPC del ${ipcPorcentaje}% aplicado exitosamente`)
    } catch (error) {
      console.error('Error al aplicar IPC:', error)
    }
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>📊 Dashboard de Renovaciones</h1>
          <div className="user-info">
            <span>👤 {user?.username}</span>
            <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Total Facturación */}
        <div className="total-facturacion">
          <h2>Total de Facturación</h2>
          <div className="total-amount">
            <span>€</span>
            <strong>{parseFloat(totalFacturacion).toFixed(2)}</strong>
          </div>
          <p>{renovaciones.length} renovaciones registradas</p>
        </div>

        {/* Filtros y Búsqueda */}
        <div className="filters-section">
          <h2>Filtros y Búsqueda</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Buscar por nombre, empresa, email o teléfono..."
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              className="filter-input"
            />
            <select
              value={filter.mes}
              onChange={(e) => setFilter({ ...filter, mes: e.target.value })}
              className="filter-select"
            >
              <option value="">Todos los meses</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
                <option key={m} value={m}>
                  {new Date(2000, m - 1).toLocaleString('es-ES', { month: 'long' })}
                </option>
              ))}
            </select>
            <select
              value={filter.year}
              onChange={(e) => setFilter({ ...filter, year: e.target.value })}
              className="filter-select"
            >
              <option value="">Todos los años</option>
              {[2000, 2005, 2010, 2015, 2020, 2025, 2026].map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>

        {/* IPC Section */}
        {selectedIds.length > 0 && (
          <div className="ipc-section">
            <h3>Aplicar IPC a {selectedIds.length} renovación(es)</h3>
            <div className="ipc-controls">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={ipcPorcentaje}
                onChange={(e) => setIpcPorcentaje(parseFloat(e.target.value))}
                className="ipc-input"
              />
              <span>%</span>
              <button onClick={handleAplicarIPC} className="btn-ipc">
                Aplicar IPC
              </button>
            </div>
          </div>
        )}

        {/* Botón Agregar */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-agregar"
        >
          {showForm ? '✖ Cancelar' : '➕ Nueva Renovación'}
        </button>

        {/* Formulario */}
        {showForm && (
          <form onSubmit={handleSubmit} className="renovacion-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre Cliente*</label>
                <input
                  type="text"
                  name="nombre_cliente"
                  value={formData.nombre_cliente}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Empresa</label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio (€)</label>
                <input
                  type="number"
                  name="precio"
                  step="0.01"
                  value={formData.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Fecha Renovación*</label>
                <input
                  type="date"
                  name="fecha_renovacion"
                  value={formData.fecha_renovacion}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="giro_bancario"
                    checked={formData.giro_bancario === 1}
                    onChange={handleInputChange}
                  />
                  Giro Bancario
                </label>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="b_flag"
                    checked={formData.b_flag === 1}
                    onChange={handleInputChange}
                  />
                  B
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Servicios Contratados</label>
              <textarea
                name="servicios_contratados"
                value={formData.servicios_contratados}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            <div className="form-group">
              <label>Comentarios</label>
              <textarea
                name="comentarios"
                value={formData.comentarios}
                onChange={handleInputChange}
                rows="2"
              />
            </div>

            <button type="submit" className="btn-submit">
              Crear Renovación
            </button>
          </form>
        )}

        {/* Tabla de Renovaciones */}
        <div className="renovaciones-table-container">
          <h2>Renovaciones ({renovaciones.length})</h2>
          {loading ? (
            <p className="loading">Cargando...</p>
          ) : renovaciones.length === 0 ? (
            <p className="empty-message">No hay renovaciones que mostrar</p>
          ) : (
            <div className="table-wrapper">
              <table className="renovaciones-table">
                <thead>
                  <tr>
                    <th style={{ width: '40px' }}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedIds(renovaciones.map(r => r.id))
                          } else {
                            setSelectedIds([])
                          }
                        }}
                        checked={selectedIds.length === renovaciones.length && renovaciones.length > 0}
                      />
                    </th>
                    <th>Nombre Cliente</th>
                    <th>Empresa</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Precio (€)</th>
                    <th>Fecha Renovación</th>
                    <th>Servicios</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {renovaciones.map((renovacion) => (
                    <tr key={renovacion.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(renovacion.id)}
                          onChange={() => handleSelectRenovacion(renovacion.id)}
                        />
                      </td>
                      <td><strong>{renovacion.nombre_cliente}</strong></td>
                      <td>{renovacion.empresa || '-'}</td>
                      <td>{renovacion.email || '-'}</td>
                      <td>{renovacion.telefono || '-'}</td>
                      <td className="price">{renovacion.precio ? parseFloat(renovacion.precio).toFixed(2) : '-'}</td>
                      <td>{new Date(renovacion.fecha_renovacion).toLocaleDateString('es-ES')}</td>
                      <td>{renovacion.servicios_contratados || '-'}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(renovacion.id)}
                          className="btn-delete-small"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
