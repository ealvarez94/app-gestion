const FacturacionSummary = ({ totalFacturacion, renovacionesCount }) => {
  return (
    <div className="total-facturacion">
      <h2>Total de Facturación</h2>
      <div className="total-amount">
        <span>€</span>
        <strong>{Number.parseFloat(totalFacturacion).toFixed(2)}</strong>
      </div>
      <p>{renovacionesCount} renovaciones registradas</p>
    </div>
  )
}

export default FacturacionSummary
