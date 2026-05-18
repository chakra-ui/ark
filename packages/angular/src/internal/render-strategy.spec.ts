import { describe, expect, it } from 'vitest'
import { initialState, onExitComplete, onPresentChange } from './render-strategy'

describe('render-strategy', () => {
  it('mounts immediately when present is true', () => {
    expect(initialState(true, false).status).toBe('mounted')
  })

  it('keeps lazy content unmounted until the first present transition', () => {
    const initial = initialState(false, true)
    expect(initial.status).toBe('unmounted')
    expect(onPresentChange(initial, true).status).toBe('mounted')
  })

  it('mounts non-lazy content even when initially not present', () => {
    expect(initialState(false, false).status).toBe('mounted')
  })

  it('transitions through unmount-on-exit when present becomes false', () => {
    const mounted = initialState(true, false)
    expect(mounted.status).toBe('mounted')
    const exiting = onPresentChange(mounted, false)
    expect(exiting.status).toBe('exiting')
    expect(onExitComplete(exiting).status).toBe('unmounted')
  })

  it('keeps unmounted state idempotent when present stays false', () => {
    const unmounted = initialState(false, true)
    expect(onPresentChange(unmounted, false).status).toBe('unmounted')
  })

  it('keeps exiting state idempotent when present stays false', () => {
    const mounted = initialState(true, false)
    const exiting = onPresentChange(mounted, false)
    expect(onPresentChange(exiting, false).status).toBe('exiting')
  })

  it('ignores exit completion unless a node is exiting', () => {
    const mounted = initialState(true, false)
    expect(onExitComplete(mounted).status).toBe('mounted')
  })

  it('keeps content mounted after exit when unmountOnExit is false', () => {
    const exiting = onPresentChange(initialState(true, false), false)
    expect(onExitComplete(exiting, false).status).toBe('mounted')
  })
})
