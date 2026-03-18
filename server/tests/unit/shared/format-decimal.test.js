import { describe, expect, it } from 'vitest'
import { formatDecimal } from '../../../src/shared/utils/format-decimal.js'

describe('formatDecimal', () => {
  it('formatea números con dos decimales', () => {
    expect(formatDecimal(12)).toBe('12.00')
    expect(formatDecimal('4.5')).toBe('4.50')
  })

  it('devuelve 0.00 cuando el valor es nulo o vacío', () => {
    expect(formatDecimal(null)).toBe('0.00')
    expect(formatDecimal(undefined)).toBe('0.00')
  })
})
