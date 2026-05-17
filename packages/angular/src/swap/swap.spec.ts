import { Component, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkSwapComponent, ArkSwapOffDirective, ArkSwapOnDirective } from './swap'

@Component({
  standalone: true,
  imports: [ArkSwapComponent, ArkSwapOnDirective, ArkSwapOffDirective],
  template: `
    <ark-swap [active]="active()">
      <ng-template arkSwapOn><span data-testid="on">On</span></ng-template>
      <ng-template arkSwapOff><span data-testid="off">Off</span></ng-template>
    </ark-swap>
  `,
})
class HostComponent {
  readonly active = signal(false)
}

describe('ArkSwapComponent (criterion 36)', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('renders the "on" template when active=true', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).toBeNull()

    fixture.destroy()
  })

  it('renders the "off" template when active=false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).toBeNull()

    fixture.destroy()
  })

  it('swaps observable DOM content when active toggles', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.active.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).toBeNull()

    fixture.componentInstance.active.set(false)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="off"]')).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-testid="on"]')).toBeNull()

    fixture.destroy()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-swap') as HTMLElement
    expect(host.getAttribute('style')).toContain('display: contents')

    fixture.destroy()
  })
})
