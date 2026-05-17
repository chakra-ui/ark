import { describe, expect, it } from 'vitest'
import { createArkId } from './id'

describe('createArkId', () => {
  it('includes the provided prefix', () => {
    const id = createArkId('root')
    expect(id).toContain('root')
  })

  it('returns unique ids on sequential calls', () => {
    const first = createArkId('part')
    const second = createArkId('part')
    expect(first).not.toBe(second)
  })

  it('increments the counter monotonically across calls', () => {
    const first = createArkId('seq')
    const second = createArkId('seq')
    const third = createArkId('seq')
    const counterOf = (id: string) => Number(id.split('::')[1])
    expect(counterOf(second)).toBeGreaterThan(counterOf(first))
    expect(counterOf(third)).toBeGreaterThan(counterOf(second))
  })
})
