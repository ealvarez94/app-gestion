export const formatDecimal = (value) => {
  return Number.parseFloat(value || 0).toFixed(2)
}
