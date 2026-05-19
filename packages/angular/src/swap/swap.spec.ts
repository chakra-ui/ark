import { Component, signal, viewChild } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { SwapFadeExample } from './examples/fade'
import { SwapFlipExample } from './examples/flip'
import { SwapRotateExample } from './examples/rotate'
import { SwapScaleExample } from './examples/scale'
import { swapAnatomy } from './swap.anatomy'
import { ArkSwapIndicatorComponent, ArkSwapRootComponent } from './swap'

@Component({
  standalone: true,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent],
  template: `
    <ark-swap [swap]="active()">
      <ark-swap-indicator type="on"><span data-testid="on">On</span></ark-swap-indicator>
      <ark-swap-indicator type="off"><span data-testid="off">Off</span></ark-swap-indicator>
    </ark-swap>
  `,
})
class HostComponent {
  readonly swap = viewChild.required(ArkSwapRootComponent)
  readonly active = signal(false)
}

@Component({
  standalone: true,
  imports: [ArkSwapRootComponent, ArkSwapIndicatorComponent],
  template: `
    <ark-swap [swap]="active()" unmountOnExit>
      <ark-swap-indicator type="on"><span data-testid="on">On</span></ark-swap-indicator>
      <ark-swap-indicator type="off"><span data-testid="off">Off</span></ark-swap-indicator>
    </ark-swap>
  `,
})
class UnmountOnExitHostComponent {
  readonly active = signal(false)
}

@Component({
  standalone: true,
  imports: [ArkSwapIndicatorComponent],
  template: `
    <ark-swap-indicator type="on">On</ark-swap-indicator>
  `,
})
class OrphanIndicatorHostComponent {}

const getPresenceForTestId = (root: HTMLElement, testId: string): HTMLElement => {
  const content = root.querySelector(`[data-testid="${testId}"]`)
  expect(content).not.toBeNull()
  const presence = content?.closest('[data-scope="presence"]') as HTMLElement | null
  expect(presence).not.toBeNull()
  return presence as HTMLElement
}

describe('ArkSwapComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface and examples', () => {
    expect(typeof swapAnatomy).toBe('object')
    expect(ArkSwapRootComponent).toBeDefined()
    expect(ArkSwapIndicatorComponent).toBeDefined()
    expect(SwapFadeExample).toBeDefined()
    expect(SwapFlipExample).toBeDefined()
    expect(SwapRotateExample).toBeDefined()
    expect(SwapScaleExample).toBeDefined()
  })

  it('binds the controlled swap state through a property binding', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.swap().swap()).toBe(false)
    expect(fixture.nativeElement.querySelector('ark-swap').getAttribute('data-swap')).toBe('off')

    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.componentInstance.swap().swap()).toBe(true)
    expect(fixture.nativeElement.querySelector('ark-swap').getAttribute('data-swap')).toBe('on')

    fixture.destroy()
  })

  it('renders the "on" template when active=true', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(getPresenceForTestId(fixture.nativeElement, 'off').hidden).toBe(true)

    fixture.destroy()
  })

  it('renders the "off" template when active=false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    expect(getPresenceForTestId(fixture.nativeElement, 'on').hidden).toBe(true)

    fixture.destroy()
  })

  it('swaps observable DOM content when active toggles', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(getPresenceForTestId(fixture.nativeElement, 'off').hidden).toBe(true)

    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    const exitingOnPresence = getPresenceForTestId(fixture.nativeElement, 'on')
    expect(exitingOnPresence.hidden).toBe(false)

    exitingOnPresence.dispatchEvent(new Event('animationend', { bubbles: true }))
    fixture.detectChanges()

    expect(getPresenceForTestId(fixture.nativeElement, 'on').hidden).toBe(true)

    fixture.destroy()
  })

  it('completes indicator exit through presence when unmountOnExit is enabled', () => {
    TestBed.configureTestingModule({ imports: [UnmountOnExitHostComponent] })
    const fixture = TestBed.createComponent(UnmountOnExitHostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(getPresenceForTestId(fixture.nativeElement, 'off').hidden).toBe(true)

    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    const exitingOnPresence = getPresenceForTestId(fixture.nativeElement, 'on')
    expect(exitingOnPresence.hidden).toBe(false)
    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()

    exitingOnPresence.dispatchEvent(new Event('animationend', { bubbles: true }))
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()

    fixture.destroy()
  })

  it('applies root host attributes', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-swap') as HTMLElement
    expect(getComputedStyle(host).display).toBe('inline-grid')
    expect(host.getAttribute('data-swap')).toBe('off')

    fixture.destroy()
  })

  it('renders icon-only demos with accessible button labels', () => {
    TestBed.configureTestingModule({ imports: [SwapFadeExample] })
    const fixture = TestBed.createComponent(SwapFadeExample)
    fixture.detectChanges()

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement
    expect(button.getAttribute('aria-label')).toBe('Toggle completion')
    expect(button.getAttribute('aria-pressed')).toBe('false')
    expect(fixture.nativeElement.querySelector('swap-check-icon svg')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('swap-x-icon svg')).not.toBeNull()

    button.click()
    fixture.detectChanges()

    expect(button.getAttribute('aria-pressed')).toBe('true')

    fixture.destroy()
  })

  it('keeps the flip example root perspective from the React demo', () => {
    TestBed.configureTestingModule({ imports: [SwapFlipExample] })
    const fixture = TestBed.createComponent(SwapFlipExample)
    fixture.detectChanges()

    const root = fixture.nativeElement.querySelector('ark-swap') as HTMLElement
    expect(root.style.perspective).toBe('200px')
    expect(fixture.nativeElement.querySelector('.FlipIndicator')).not.toBeNull()

    fixture.destroy()
  })

  it('throws a targeted error when an indicator is rendered without a swap root', () => {
    TestBed.configureTestingModule({ imports: [OrphanIndicatorHostComponent] })

    expect(() => {
      const fixture = TestBed.createComponent(OrphanIndicatorHostComponent)
      fixture.detectChanges()
      fixture.destroy()
    }).toThrow(/ArkSwapIndicatorComponent must be used inside an ArkSwapRootComponent/)
  })
})
