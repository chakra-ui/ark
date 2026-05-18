import { describe, expect, it } from 'vitest'

describe('package anatomy aggregate', () => {
  it('re-exports avatarAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.avatarAnatomy).toBeDefined()
  })

  it('re-exports collapsibleAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.collapsibleAnatomy).toBeDefined()
  })

  it('re-exports progressAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.progressAnatomy).toBeDefined()
  })

  it('re-exports toggleAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.toggleAnatomy).toBeDefined()
  })

  it('re-exports tooltipAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.tooltipAnatomy).toBeDefined()
  })
})
