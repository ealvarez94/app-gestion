import { describe, expect, it } from 'vitest'
import { pickDefinedFields } from '../../../src/shared/utils/pick-defined-fields.js'

describe('pickDefinedFields', () => {
  it('devuelve solo los campos permitidos y definidos', () => {
    const result = pickDefinedFields(
      {
        nombre_cliente: 'Acme',
        email: 'hola@acme.com',
        precio: undefined,
        ignorado: 'valor'
      },
      ['nombre_cliente', 'email', 'precio']
    )

    expect(result).toEqual({
      nombre_cliente: 'Acme',
      email: 'hola@acme.com'
    })
  })

  it('devuelve un objeto vacío si no hay coincidencias válidas', () => {
    const result = pickDefinedFields(
      { ignorado: true, precio: undefined },
      ['nombre_cliente', 'email']
    )

    expect(result).toEqual({})
  })
})
