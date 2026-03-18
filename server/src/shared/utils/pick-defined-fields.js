export const pickDefinedFields = (input, allowedFields) => {
  const entries = Object.entries(input).filter(([key, value]) => {
    return allowedFields.includes(key) && value !== undefined
  })

  return Object.fromEntries(entries)
}
