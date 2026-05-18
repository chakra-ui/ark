import { describe, expect, it } from 'vitest'

describe('package anatomy aggregate', () => {
  it('re-exports avatarAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.avatarAnatomy).toBeDefined()
  })

  it('re-exports progressAnatomy', async () => {
    const mod = await import('./anatomy')
    expect(mod.progressAnatomy).toBeDefined()
  })
})
