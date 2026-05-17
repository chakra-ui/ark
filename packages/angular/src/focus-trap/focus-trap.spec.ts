import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import type { TrapFocusOptions } from '@zag-js/focus-trap'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const deactivateMock = vi.fn()
const trapFocusMock = vi.fn<(el: HTMLElement, options?: TrapFocusOptions) => () => void>(() => deactivateMock)

vi.mock('@zag-js/focus-trap', () => ({
  trapFocus: (el: HTMLElement, options?: TrapFocusOptions) => trapFocusMock(el, options),
}))

import { ArkFocusTrapDirective } from './focus-trap'

describe('ArkFocusTrapDirective (criterion 31)', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    trapFocusMock.mockClear()
    deactivateMock.mockClear()
  })

  afterEach(() => {
    trapFocusMock.mockClear()
    deactivateMock.mockClear()
  })

  const mount = (initialActive: boolean) => {
    const active = signal(initialActive)

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

  it('passes pass-through options to trapFocus', async () => {
    const onActivate = vi.fn()

    @Component({
      standalone: true,
      imports: [ArkFocusTrapDirective],
      template: '<div tabindex="-1" [arkFocusTrap]="active()" [arkFocusTrapOptions]="options"></div>',
    })
    class HostComponent {
      readonly active = signal(true)
      readonly options: TrapFocusOptions = { onActivate, returnFocusOnDeactivate: false }
    }

    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(trapFocusMock).toHaveBeenCalledTimes(1)
    const [, passedOptions] = trapFocusMock.mock.calls[0]
    expect(passedOptions).toEqual({ onActivate, returnFocusOnDeactivate: false })

    fixture.destroy()
  })
})
