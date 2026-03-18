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
