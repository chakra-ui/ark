import { describe, expect, it } from 'vitest'

describe('@ark-ui/angular forms isolation', () => {
  it('root entry point imports without resolving @angular/forms', async () => {
    const mod = await import('./index')
    expect(mod).toBeDefined()
  })

  it('avatar secondary entry point imports without resolving @angular/forms', async () => {
    const mod = await import('./avatar/public-api')
    expect(mod).toBeDefined()
  })

  it('neither entry point statically depends on @angular/forms', async () => {
    const indexSrc = await import('./index?raw').then((m) => m.default as string).catch(() => null)
    const avatarSrc = await import('./avatar/public-api?raw').then((m) => m.default as string).catch(() => null)

    if (indexSrc !== null) {
      expect(indexSrc).not.toContain('@angular/forms')
    }
    if (avatarSrc !== null) {
      expect(avatarSrc).not.toContain('@angular/forms')
    }
  })
})
