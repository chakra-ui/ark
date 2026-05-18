import { describe, expect, it } from 'vitest'
import { normalizeProps } from './normalize-props'

describe('normalizeProps', () => {
  it('returns regular keys unchanged', () => {
    const input = { id: 'root', role: 'button', tabIndex: 0 }
    expect(normalizeProps.element(input)).toEqual(input)
  })

  it('returns event-like keys unchanged', () => {
    const input = {
      onClick: () => undefined,
      onKeyDown: () => undefined,
      onPointerDown: () => undefined,
    }
    expect(normalizeProps.element(input)).toEqual(input)
  })

  it('returns data-* keys unchanged', () => {
    const input = { 'data-state': 'open', 'data-disabled': '', 'data-part': 'trigger' }
    expect(normalizeProps.element(input)).toEqual(input)
  })

  it('returns aria-* and mixed-shape keys unchanged', () => {
    const input = {
      'aria-expanded': true,
      'aria-controls': 'panel-1',
      id: 'trigger',
      onClick: () => undefined,
      'data-scope': 'menu',
    }
    expect(normalizeProps.element(input)).toEqual(input)
  })

  it('preserves the same object reference', () => {
    const input = { id: 'root' }
    expect(normalizeProps.element(input)).toBe(input)
  })
})
