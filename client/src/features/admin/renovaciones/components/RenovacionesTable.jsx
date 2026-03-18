import { Fragment, useState } from 'react'

const RenovacionesTable = ({
  renovaciones,
  loading,
  selectedIds,
  onEdit,
  onToggleSelectAll,
  onToggleSelection,
  onDelete
}) => {
  const [expandedRenovacionId, setExpandedRenovacionId] = useState(null)

  const toggleExpandedRenovacion = (id) => {
    setExpandedRenovacionId((currentId) => (currentId === id ? null : id))
  }

  return (
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
                    onChange={(event) => onToggleSelectAll(event.target.checked)}
                    checked={selectedIds.length === renovaciones.length && renovaciones.length > 0}
                  />
                </th>
                <th>Nombre Cliente</th>
                <th>Empresa</th>
                <th>Servicios</th>
                <th>Fecha Renovación</th>
                <th>Precio (€)</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {renovaciones.map((renovacion) => {
                const isExpanded = expandedRenovacionId === renovacion.id

                return (
                  <Fragment key={renovacion.id}>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(renovacion.id)}
                          onChange={() => onToggleSelection(renovacion.id)}
                        />
                      </td>
                      <td>
                        <button
                          type="button"
                          className="cliente-toggle"
                          onClick={() => toggleExpandedRenovacion(renovacion.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`renovacion-detalle-${renovacion.id}`}
                          aria-label={`Ver detalle de ${renovacion.nombre_cliente}`}
                        >
                          <span className="cliente-toggle-name">
                            {renovacion.nombre_cliente}
                          </span>
                          <span className="cliente-toggle-icon">
                            {isExpanded ? '▲' : '▼'}
                          </span>
                        </button>
                      </td>
                      <td>{renovacion.empresa || '-'}</td>
                      <td>{renovacion.servicios_contratados || '-'}</td>
                      <td>{new Date(renovacion.fecha_renovacion).toLocaleDateString('es-ES')}</td>
                      <td className="price">
                        {renovacion.precio ? Number.parseFloat(renovacion.precio).toFixed(2) : '-'}
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => onEdit(renovacion)}
                          className="btn-edit-small"
                          aria-label={`Editar ${renovacion.nombre_cliente}`}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => onDelete(renovacion.id)}
                          className="btn-delete-small"
                          aria-label={`Eliminar ${renovacion.nombre_cliente}`}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr
                        id={`renovacion-detalle-${renovacion.id}`}
                        className="renovacion-detail-row"
                      >
                        <td colSpan="7">
                          <div className="renovacion-detail-grid">
                            <div>
                              <span className="detail-label">Email</span>
                              <p>{renovacion.email || '-'}</p>
                            </div>
                            <div>
                              <span className="detail-label">Teléfono</span>
                              <p>{renovacion.telefono || '-'}</p>
                            </div>
                            <div>
                              <span className="detail-label">Giro bancario</span>
                              <p>{renovacion.giro_bancario ? 'Sí' : 'No'}</p>
                            </div>
                            <div>
                              <span className="detail-label">B</span>
                              <p>{renovacion.b_flag ? 'Sí' : 'No'}</p>
                            </div>
                            <div className="detail-full-width">
                              <span className="detail-label">Comentarios</span>
                              <p>{renovacion.comentarios || '-'}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default RenovacionesTable
