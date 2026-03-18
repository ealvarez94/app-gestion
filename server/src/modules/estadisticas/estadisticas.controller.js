import { getEstadisticasMensuales } from './estadisticas.service.js'

export const getMonthlyStatistics = async (req, res) => {
  const result = await getEstadisticasMensuales()
  res.json(result)
}
