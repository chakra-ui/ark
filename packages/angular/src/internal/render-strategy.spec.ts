import { describe, expect, it } from 'vitest'
import { initialState, onExitComplete, onPresentChange } from './render-strategy'

describe('render-strategy', () => {
  it('mounts immediately when present is true', () => {
    expect(initialState(true, false).status).toBe('mounted')
  })

  it('supports lazy mount on first present transition', () => {
    const initial = initialState(false, true)
    expect(initial.status).toBe('unmounted')
    expect(onPresentChange(initial, true).status).toBe('mounted')
  })

  it('transitions through unmount-on-exit when present becomes false', () => {
    const mounted = initialState(true, false)
    expect(mounted.status).toBe('mounted')
    const exiting = onPresentChange(mounted, false)
    expect(exiting.status).toBe('exiting')
    expect(onExitComplete(exiting).status).toBe('unmounted')
  })

  it('keeps unmounted state idempotent when present stays false', () => {
    const unmounted = initialState(false, false)
    expect(onPresentChange(unmounted, false).status).toBe('unmounted')
  })

  it('keeps exiting state idempotent when present stays false', () => {
    const mounted = initialState(true, false)
    const exiting = onPresentChange(mounted, false)
    expect(onPresentChange(exiting, false).status).toBe('exiting')
  })
})
