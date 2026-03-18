const addThousandsSeparator = (value) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const formatCurrency = (value) => {
  const normalizedValue = Number(value || 0).toFixed(2)
  const [integerPart, decimalPart] = normalizedValue.split('.')

  return `${addThousandsSeparator(integerPart)},${decimalPart}`
}

const formatCount = (value) => {
  return addThousandsSeparator(String(Number(value || 0)))
}

const FacturacionCard = ({ title, totalFacturacion, renovacionesCount }) => {
  return (
    <div className="total-facturacion">
      <h2>{title}</h2>
      <div className="total-amount">
        <strong>{formatCurrency(totalFacturacion)}</strong>
        <span>€</span>
      </div>
      <p>{formatCount(renovacionesCount)} renovaciones</p>
    </div>
  )
}

const FacturacionSummary = ({ overallSummary, filteredSummary }) => {
  return (
    <div className="summary-grid">
      <FacturacionCard
        title="Total general"
        totalFacturacion={overallSummary.totalFacturacion}
        renovacionesCount={overallSummary.renovacionesCount}
      />

      <FacturacionCard
        title="Resultado actual"
        totalFacturacion={filteredSummary.totalFacturacion}
        renovacionesCount={filteredSummary.renovacionesCount}
      />
    </div>
  )
}

export default FacturacionSummary
