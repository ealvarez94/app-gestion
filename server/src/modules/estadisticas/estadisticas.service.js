import { formatDecimal } from '../../shared/utils/format-decimal.js'
import { getMonthlyStats } from './estadisticas.repository.js'

export const getEstadisticasMensuales = async () => {
  const stats = await getMonthlyStats()

  return stats.map((stat) => ({
    ...stat,
    total: formatDecimal(stat.total),
    promedio: formatDecimal(stat.promedio)
  }))
}
