import { Component, Directive, InjectionToken, ViewChild, inject, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkPresenceComponent } from './presence'

const PRESENCE_TOKEN = new InjectionToken<string>('PRESENCE_TOKEN')

const sentinelCapture: { tokenValue: string | null } = {
  tokenValue: null,
}

@Directive({
  standalone: true,
  selector: '[presenceSentinel]',
})
class PresenceSentinelDirective {
  constructor() {
    sentinelCapture.tokenValue = inject(PRESENCE_TOKEN, { optional: true })
  }
}

@Component({
  standalone: true,
  imports: [ArkPresenceComponent, PresenceSentinelDirective],
  providers: [{ provide: PRESENCE_TOKEN, useValue: 'from-host' }],
  template: `
    <ark-presence [present]="present()" [lazyMount]="lazyMount()" [unmountOnExit]="unmountOnExit()">
      <ng-template>
        <span data-testid="content" presenceSentinel>Hello</span>
      </ng-template>
    </ark-presence>
  `,
})
class HostComponent {
  @ViewChild(ArkPresenceComponent) presenceRef!: ArkPresenceComponent
  readonly present = signal(false)
  readonly lazyMount = signal(false)
  readonly unmountOnExit = signal(false)
}

const queryContent = (root: HTMLElement) => root.querySelector('[data-testid="content"]')

describe('ArkPresenceComponent (criterion 35)', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    sentinelCapture.tokenValue = null
  })

  it('mounts content immediately when present is true on initial render', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(queryContent(fixture.nativeElement)).not.toBeNull()
    expect(fixture.componentInstance.presenceRef.status()).toBe('mounted')

    fixture.destroy()
  })

  it('defers rendering until first present transition when lazyMount is true', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.lazyMount.set(true)
    fixture.componentInstance.present.set(false)
    fixture.detectChanges()

    expect(queryContent(fixture.nativeElement)).toBeNull()
    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')

    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(queryContent(fixture.nativeElement)).not.toBeNull()
    expect(fixture.componentInstance.presenceRef.status()).toBe('mounted')

    fixture.destroy()
  })

  it('transitions through exiting before unmount when present flips to false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()
    expect(fixture.componentInstance.presenceRef.status()).toBe('mounted')

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('exiting')
    expect(queryContent(fixture.nativeElement)).not.toBeNull()

    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')
    expect(queryContent(fixture.nativeElement)).toBeNull()

    fixture.destroy()
  })

  it('emits the exitComplete output when onExitComplete is invoked', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    expect(fixture.componentInstance.presenceRef.status()).toBe('exiting')

    let emitted = 0
    fixture.componentInstance.presenceRef.exitComplete.subscribe(() => {
      emitted += 1
    })

    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    expect(emitted).toBe(1)
    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')

    fixture.destroy()
  })

  it('preserves host provider context across enter and exit lifecycles', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-host')

    sentinelCapture.tokenValue = null
    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-host')

    fixture.destroy()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-presence') as HTMLElement
    expect(host.getAttribute('style')).toContain('display: contents')

    fixture.destroy()
  })
})
