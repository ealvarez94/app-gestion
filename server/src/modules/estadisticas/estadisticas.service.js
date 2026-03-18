import { getMonthlyStats } from './estadisticas.repository.js'

export const getEstadisticasMensuales = async () => {
  const stats = await getMonthlyStats()

  return stats.map((stat) => ({
    ...stat,
    total: Number.parseFloat(stat.total || 0).toFixed(2),
    promedio: Number.parseFloat(stat.promedio || 0).toFixed(2)
  }))
}
