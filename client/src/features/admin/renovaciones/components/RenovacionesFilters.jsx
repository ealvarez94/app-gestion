import { AVAILABLE_YEARS } from '../constants'

const RenovacionesFilters = ({ filter, onFilterChange }) => {
  return (
    <div className="filters-section">
      <h2>Filtros y Búsqueda</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nombre, empresa, email o teléfono..."
          value={filter.search}
          onChange={(event) => onFilterChange({ search: event.target.value })}
          className="filter-input"
        />
        <select
          value={filter.mes}
          onChange={(event) => onFilterChange({ mes: event.target.value })}
          className="filter-select"
        >
          <option value="">Todos los meses</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((mes) => (
            <option key={mes} value={mes}>
              {new Date(2000, mes - 1).toLocaleString('es-ES', { month: 'long' })}
            </option>
          ))}
        </select>
        <select
          value={filter.year}
          onChange={(event) => onFilterChange({ year: event.target.value })}
          className="filter-select"
        >
          <option value="">Todos los años</option>
          {AVAILABLE_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default RenovacionesFilters
