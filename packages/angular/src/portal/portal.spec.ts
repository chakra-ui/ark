import { ApplicationRef, Component, Directive, InjectionToken, PLATFORM_ID, inject, signal } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkPortalComponent } from './portal'

const PORTAL_TOKEN = new InjectionToken<string>('PORTAL_TOKEN')

const sentinelCapture: { tokenValue: string | null } = {
  tokenValue: null,
}

@Directive({
  standalone: true,
  selector: '[portalSentinel]',
})
class PortalSentinelDirective {
  constructor() {
    sentinelCapture.tokenValue = inject(PORTAL_TOKEN)
  }
}

@Component({
  standalone: true,
  imports: [ArkPortalComponent, PortalSentinelDirective],
  template: `
    <div data-testid="host-root">
      @if (showPortal()) {
        <ark-portal [target]="target()">
          <span data-testid="projected" portalSentinel>Projected</span>
        </ark-portal>
      }
    </div>
    <div data-testid="portal-target"></div>
  `,
  providers: [{ provide: PORTAL_TOKEN, useValue: 'from-host' }],
})
class HostComponent {
  readonly target = signal<HTMLElement | null>(null)
  readonly showPortal = signal(false)
}

describe('ArkPortalComponent (criterion 34)', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    sentinelCapture.tokenValue = null
  })

  const mountWithTarget = async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const target = fixture.nativeElement.querySelector('[data-testid="portal-target"]') as HTMLElement
    fixture.componentInstance.target.set(target)
    fixture.componentInstance.showPortal.set(true)
    fixture.detectChanges()

    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    return { fixture, target }
  }

  it('preserves origin injector context when moving projected content', async () => {
    const { fixture } = await mountWithTarget()
    expect(sentinelCapture.tokenValue).toBe('from-host')
    fixture.destroy()
  })

  it('moves projected DOM into the supplied target outside the host subtree', async () => {
    const { fixture, target } = await mountWithTarget()
    const hostRoot = fixture.nativeElement.querySelector('[data-testid="host-root"]') as HTMLElement

    const projected = target.querySelector('[data-testid="projected"]')
    expect(projected).not.toBeNull()
    expect(hostRoot.querySelector('[data-testid="projected"]')).toBeNull()

    fixture.destroy()
  })

  it('removes projected DOM from the target on destroy', async () => {
    const { fixture, target } = await mountWithTarget()
    expect(target.querySelector('[data-testid="projected"]')).not.toBeNull()

    fixture.destroy()

    expect(target.querySelector('[data-testid="projected"]')).toBeNull()
  })

  it('constructs without throwing under a server platform configuration (SSR-safe)', () => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(HostComponent)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.showPortal.set(true)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-portal') as HTMLElement
    expect(host.getAttribute('style')).toContain('display: contents')

    fixture.destroy()
  })
})
