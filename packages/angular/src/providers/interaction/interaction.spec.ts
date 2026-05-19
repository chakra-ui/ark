import { Component, PLATFORM_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { type InteractionContext, injectArkInteraction, provideArkInteraction } from './interaction'

@Component({
  standalone: true,
  template: '',
})
class HostComponent {
  readonly ctx: InteractionContext = injectArkInteraction()
}

describe('provideArkInteraction / injectArkInteraction', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('returns null modality and false isFocusVisible when no provider is configured', () => {
    TestBed.configureTestingModule({ providers: [] })
    const ctx = TestBed.runInInjectionContext(() => injectArkInteraction())
    expect(ctx.modality()).toBeNull()
    expect(ctx.isFocusVisible()).toBe(false)
  })

  it('sets modality to "pointer" on pointerdown events', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    expect(ctx.modality()).toBeNull()

    document.dispatchEvent(new Event('pointerdown'))
    expect(ctx.modality()).toBe('pointer')
    expect(ctx.isFocusVisible()).toBe(false)

    fixture.destroy()
  })

  it('sets modality to "keyboard" and isFocusVisible to true on navigation keydown', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    expect(ctx.modality()).toBe('keyboard')
    expect(ctx.isFocusVisible()).toBe(true)

    fixture.destroy()
  })

  it('sets isFocusVisible to false after pointer input follows keyboard input', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    expect(ctx.isFocusVisible()).toBe(true)

    document.dispatchEvent(new Event('pointerdown'))
    expect(ctx.modality()).toBe('pointer')
    expect(ctx.isFocusVisible()).toBe(false)

    fixture.destroy()
  })

  it('ignores non-navigation keys', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }))
    expect(ctx.modality()).toBeNull()

    fixture.destroy()
  })

  it('removes listeners on destroy so further events do not change modality', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    document.dispatchEvent(new Event('pointerdown'))
    expect(ctx.modality()).toBe('pointer')

    const lastModality = ctx.modality()
    fixture.destroy()
    TestBed.resetTestingModule()

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }))
    expect(ctx.modality()).toBe(lastModality)
  })

  it('does not register listeners on non-browser platforms (SSR-safe)', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }, provideArkInteraction()],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const ctx = fixture.componentInstance.ctx
    document.dispatchEvent(new Event('pointerdown'))
    expect(ctx.modality()).toBeNull()

    fixture.destroy()
  })
})
