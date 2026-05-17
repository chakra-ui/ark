import { describe, expect, it } from 'vitest'
import { splitProps } from './split-props'

describe('splitProps', () => {
  it('picks selected keys into the first tuple element', () => {
    const source = { a: 1, b: 'two', c: true }
    const [picked] = splitProps(source, ['a', 'b'] as const)
    expect(picked).toEqual({ a: 1, b: 'two' })
  })

  it('leaves unselected keys in the second tuple element', () => {
    const source = { a: 1, b: 'two', c: true }
    const [, rest] = splitProps(source, ['a'] as const)
    expect(rest).toEqual({ b: 'two', c: true })
  })

  it('ignores keys present in keys array but missing from source', () => {
    const source = { a: 1, b: 2 } as { a: number; b: number; missingKey?: number }
    const [picked] = splitProps(source, ['a', 'missingKey'] as const)
    expect(picked).toEqual({ a: 1 })
    expect('missingKey' in picked).toBe(false)
  })

  it('does not mutate the input source object', () => {
    const source = { a: 1, b: 'two', c: true }
    const snapshot = { ...source }
    splitProps(source, ['a', 'b'] as const)
    expect(source).toEqual(snapshot)
  })

  it('returns new object references distinct from the source', () => {
    const source = { a: 1, b: 2 }
    const [picked, rest] = splitProps(source, ['a'] as const)
    expect(picked).not.toBe(source)
    expect(rest).not.toBe(source)
  })
})
