import { Component, PLATFORM_ID, signal, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import type { TrapFocusOptions } from '@zag-js/focus-trap'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const { deactivateMock, trapFocusMock } = vi.hoisted(() => {
  const deactivate = vi.fn()
  return {
    deactivateMock: deactivate,
    trapFocusMock: vi.fn<(el: HTMLElement, options?: TrapFocusOptions) => () => void>(() => deactivate),
  }
})

vi.mock('@zag-js/focus-trap', () => ({
  trapFocus: (el: HTMLElement, options?: TrapFocusOptions) => trapFocusMock(el, options),
}))

import { ArkFocusTrapDirective } from './focus-trap'

describe('ArkFocusTrapDirective', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    trapFocusMock.mockClear()
    deactivateMock.mockClear()
  })

  afterEach(() => {
    trapFocusMock.mockClear()
    deactivateMock.mockClear()
  })

  const mount = (initialActive: boolean | null | undefined) => {
    const active = signal<boolean | null | undefined>(initialActive)

    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div data-testid="trap" tabindex="-1" [arkFocusTrap]="active()"></div>',
    })
    class HostComponent {
      readonly active = active
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    const host = fixture.nativeElement.querySelector('[data-testid="trap"]') as HTMLElement
    return { fixture, host, active }
  }

  it.each([false, null, undefined])('does not activate when arkFocusTrap is %s', async (initialActive) => {
    const { fixture } = mount(initialActive)
    await fixture.whenStable()
    fixture.detectChanges()

    expect(trapFocusMock).not.toHaveBeenCalled()

    fixture.destroy()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('activates the focus trap on the host element when the signal becomes true', async () => {
    const { fixture, host, active } = mount(false)
    expect(trapFocusMock).not.toHaveBeenCalled()

    active.set(true)
    await fixture.whenStable()
    fixture.detectChanges()

    expect(trapFocusMock).toHaveBeenCalledTimes(1)
    expect(trapFocusMock).toHaveBeenCalledWith(host, undefined)

    fixture.destroy()
  })

  it('exports the directive instance for template references', () => {
    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div arkFocusTrap #trap="arkFocusTrap"></div>',
    })
    class HostComponent {
      readonly directive = viewChild.required<ArkFocusTrapDirective>('trap')
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.directive()).toBeInstanceOf(ArkFocusTrapDirective)

    fixture.destroy()
  })

  it('does not activate the focus trap on the server platform', async () => {
    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div tabindex="-1" [arkFocusTrap]="true"></div>',
    })
    class HostComponent {}

    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await fixture.whenStable()

    expect(trapFocusMock).not.toHaveBeenCalled()

    fixture.destroy()
    expect(deactivateMock).not.toHaveBeenCalled()
  })

  it('deactivates the focus trap when the signal toggles back to false', async () => {
    const { fixture, active } = mount(true)
    await fixture.whenStable()
    fixture.detectChanges()
    expect(trapFocusMock).toHaveBeenCalledTimes(1)
    expect(deactivateMock).not.toHaveBeenCalled()

    active.set(false)
    await fixture.whenStable()
    fixture.detectChanges()

    expect(deactivateMock).toHaveBeenCalledTimes(1)

    fixture.destroy()
    expect(deactivateMock).toHaveBeenCalledTimes(1)
  })

  it('tears down the focus trap on directive destruction', async () => {
    const { fixture } = mount(true)
    await fixture.whenStable()
    fixture.detectChanges()
    expect(trapFocusMock).toHaveBeenCalledTimes(1)
    expect(deactivateMock).not.toHaveBeenCalled()

    fixture.destroy()

    expect(deactivateMock).toHaveBeenCalledTimes(1)
  })

  it('passes supported focus trap options to trapFocus', async () => {
    const onActivate = vi.fn()
    const onDeactivate = vi.fn()
    const initialFocus = vi.fn<() => HTMLElement | false>(() => false)
    const fallbackFocus = vi.fn<() => HTMLElement>(() => document.body)
    const setReturnFocus = vi.fn<() => HTMLElement | false>(() => false)

    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div tabindex="-1" [arkFocusTrap]="active()" [arkFocusTrapOptions]="options"></div>',
    })
    class HostComponent {
      readonly active = signal(true)
      readonly options: TrapFocusOptions = {
        onActivate,
        onDeactivate,
        initialFocus,
        fallbackFocus,
        returnFocusOnDeactivate: false,
        setReturnFocus,
      }
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(trapFocusMock).toHaveBeenCalledTimes(1)
    const [, passedOptions] = trapFocusMock.mock.calls[0]
    expect(passedOptions).toEqual({
      onActivate,
      onDeactivate,
      initialFocus,
      fallbackFocus,
      returnFocusOnDeactivate: false,
      setReturnFocus,
    })

    fixture.destroy()
  })

  it('reactivates when options identity changes while active stays true', async () => {
    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div tabindex="-1" [arkFocusTrap]="true" [arkFocusTrapOptions]="options()"></div>',
    })
    class HostComponent {
      readonly options = signal<TrapFocusOptions>({ returnFocusOnDeactivate: false })
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await fixture.whenStable()

    fixture.componentInstance.options.set({ returnFocusOnDeactivate: true })
    fixture.detectChanges()
    await fixture.whenStable()

    expect(trapFocusMock).toHaveBeenCalledTimes(2)
    expect(deactivateMock).toHaveBeenCalledTimes(1)

    fixture.destroy()
  })
})
