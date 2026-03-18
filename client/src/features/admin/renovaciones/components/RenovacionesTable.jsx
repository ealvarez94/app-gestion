const RenovacionesTable = ({
  renovaciones,
  loading,
  selectedIds,
  onToggleSelectAll,
  onToggleSelection,
  onDelete
}) => {
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
                      onChange={() => onToggleSelection(renovacion.id)}
                    />
                  </td>
                  <td><strong>{renovacion.nombre_cliente}</strong></td>
                  <td>{renovacion.empresa || '-'}</td>
                  <td>{renovacion.email || '-'}</td>
                  <td>{renovacion.telefono || '-'}</td>
                  <td className="price">
                    {renovacion.precio ? Number.parseFloat(renovacion.precio).toFixed(2) : '-'}
                  </td>
                  <td>{new Date(renovacion.fecha_renovacion).toLocaleDateString('es-ES')}</td>
                  <td>{renovacion.servicios_contratados || '-'}</td>
                  <td>
                    <button
                      onClick={() => onDelete(renovacion.id)}
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
  )
}

export default RenovacionesTable
