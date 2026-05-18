import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
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
  readonly active = signal(false)
}

describe('ArkSwapComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders the "on" template when active=true', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="off"]').closest('[data-scope="presence"]').hidden).toBe(
      true,
    )

    fixture.destroy()
  })

  it('renders the "off" template when active=false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="on"]').closest('[data-scope="presence"]').hidden).toBe(
      true,
    )

    fixture.destroy()
  })

  it('swaps observable DOM content when active toggles', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(
      (fixture.nativeElement.querySelector('[data-testid="off"]').closest('[data-scope="presence"]') as HTMLElement)
        .hidden,
    ).toBe(true)

    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    expect(
      (fixture.nativeElement.querySelector('[data-testid="on"]').closest('[data-scope="presence"]') as HTMLElement)
        .hidden,
    ).toBe(true)

    fixture.destroy()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-swap') as HTMLElement
    expect(getComputedStyle(host).display).toBe('inline-grid')
    expect(host.getAttribute('data-swap')).toBe('off')

    fixture.destroy()
  })
})
