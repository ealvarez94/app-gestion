export const buildRenovacionesQuery = (filter) => {
  const params = new URLSearchParams()

  if (filter.search) {
    params.append('search', filter.search)
  }

  if (filter.mes) {
    params.append('mes', filter.mes)
  }

  if (filter.year) {
    params.append('year', filter.year)
  }

  const query = params.toString()

  return query ? `/api/renovaciones?${query}` : '/api/renovaciones'
}

export const getEmptyRenovacionForm = () => ({
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

const normalizeCheckboxValue = (value) => (value ? 1 : 0)

const normalizeDateValue = (value) => {
  if (!value) {
    return ''
  }

  return String(value).split('T')[0]
}

export const buildRenovacionFormFromData = (renovacion) => ({
  nombre_cliente: renovacion.nombre_cliente || '',
  empresa: renovacion.empresa || '',
  giro_bancario: normalizeCheckboxValue(renovacion.giro_bancario),
  b_flag: normalizeCheckboxValue(renovacion.b_flag),
  precio: renovacion.precio || '',
  fecha_renovacion: normalizeDateValue(renovacion.fecha_renovacion),
  comentarios: renovacion.comentarios || '',
  servicios_contratados: renovacion.servicios_contratados || '',
  telefono: renovacion.telefono || '',
  email: renovacion.email || ''
})
