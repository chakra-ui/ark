import { NgTemplateOutlet } from '@angular/common'
import {
  ApplicationRef,
  Component,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
  InjectionToken,
  PLATFORM_ID,
  ViewChild,
  type ViewContainerRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ArkPortalComponent } from './portal'

const PORTAL_TOKEN = new InjectionToken<string>('PORTAL_TOKEN')
const ORIGIN_TOKEN = new InjectionToken<string>('ORIGIN_TOKEN')

const sentinelCapture: { tokenValue: string | null; originValue: string | null } = {
  tokenValue: null,
  originValue: null,
}

@Directive({
  standalone: true,
  selector: '[portalSentinel]',
})
class PortalSentinelDirective {
  constructor() {
    sentinelCapture.tokenValue = inject(PORTAL_TOKEN)
    sentinelCapture.originValue = inject(ORIGIN_TOKEN, { optional: true })
  }
}

@Component({
  standalone: true,
  imports: [ArkPortalComponent, PortalSentinelDirective],
  template: `
    <div data-testid="host-root">
      @if (showPortal()) {
        <ark-portal [target]="target()" [originInjector]="originInjector()">
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
  readonly originInjector = signal<Injector | null>(null)
}

@Component({
  standalone: true,
  imports: [ArkPortalComponent],
  template: `
    <div data-testid="default-host-root">
      <ark-portal>
        <span data-testid="default-projected">Default</span>
      </ark-portal>
    </div>
  `,
})
class DefaultTargetHostComponent {}

const originSentinelCapture: { tokenValue: string | null; originValue: string | null } = {
  tokenValue: null,
  originValue: null,
}

@Directive({
  standalone: true,
  selector: '[originSentinel]',
})
class OriginSentinelDirective {
  constructor() {
    originSentinelCapture.tokenValue = inject(PORTAL_TOKEN, { optional: true })
    originSentinelCapture.originValue = inject(ORIGIN_TOKEN, { optional: true })
  }
}

@Component({
  standalone: true,
  imports: [ArkPortalComponent, OriginSentinelDirective, NgTemplateOutlet],
  template: `
    <div data-testid="origin-target"></div>
    <ark-portal [target]="target()" [originInjector]="originInjector">
      <ng-container *ngTemplateOutlet="content; injector: originInjector" />
    </ark-portal>
    <ng-template #content>
      <span data-testid="origin-projected" originSentinel>Origin</span>
    </ng-template>
  `,
})
class OriginInjectorHostComponent {
  readonly target = signal<HTMLElement | null>(null)
  readonly originInjector = Injector.create({
    providers: [
      { provide: PORTAL_TOKEN, useValue: 'from-origin' },
      { provide: ORIGIN_TOKEN, useValue: 'origin-only' },
    ],
    parent: inject(EnvironmentInjector),
  })

  constructor() {
    const elementRef = inject(ElementRef<HTMLElement>)
    afterNextRender(() => {
      this.target.set(elementRef.nativeElement.querySelector('[data-testid="origin-target"]'))
    })
  }
}

@Component({
  standalone: true,
  imports: [ArkPortalComponent, OriginSentinelDirective],
  template: `
    <div data-testid="spy-target"></div>
    <ark-portal [target]="target()" [originInjector]="originInjector">
      <span data-testid="spy-projected" originSentinel>Origin</span>
    </ark-portal>
  `,
})
class CreateEmbeddedViewSpyHostComponent {
  readonly target = signal<HTMLElement | null>(null)
  readonly originInjector = Injector.create({
    providers: [
      { provide: PORTAL_TOKEN, useValue: 'from-origin' },
      { provide: ORIGIN_TOKEN, useValue: 'origin-only' },
    ],
    parent: inject(EnvironmentInjector),
  })
  createEmbeddedView: ReturnType<typeof vi.spyOn> | null = null

  @ViewChild(ArkPortalComponent)
  set portalRef(portal: ArkPortalComponent | undefined) {
    if (!portal || this.createEmbeddedView) return
    const vcRef = (portal as unknown as { vcRef: ViewContainerRef }).vcRef
    this.createEmbeddedView = vi.spyOn(vcRef, 'createEmbeddedView')
  }

  constructor() {
    const elementRef = inject(ElementRef<HTMLElement>)
    afterNextRender(() => {
      this.target.set(elementRef.nativeElement.querySelector('[data-testid="spy-target"]'))
    })
  }
}

describe('ArkPortalComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    sentinelCapture.tokenValue = null
    sentinelCapture.originValue = null
    originSentinelCapture.tokenValue = null
    originSentinelCapture.originValue = null
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

  const flushPortalRender = async (fixture: { detectChanges: () => void }) => {
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()
  }

  it('moves projected DOM into document.body when no target is provided', async () => {
    TestBed.configureTestingModule({ imports: [DefaultTargetHostComponent] })
    const fixture = TestBed.createComponent(DefaultTargetHostComponent)
    fixture.detectChanges()

    await flushPortalRender(fixture)

    const projected = document.body.querySelector('[data-testid="default-projected"]')
    const hostRoot = fixture.nativeElement.querySelector('[data-testid="default-host-root"]') as HTMLElement
    expect(projected).not.toBeNull()
    expect(hostRoot.querySelector('[data-testid="default-projected"]')).toBeNull()

    fixture.destroy()
  })

  it('preserves origin injector context when moving projected content', async () => {
    const { fixture } = await mountWithTarget()
    expect(sentinelCapture.tokenValue).toBe('from-host')
    fixture.destroy()
  })

  it('lets projected content inject tokens from a supplied originInjector after moving', async () => {
    TestBed.configureTestingModule({ imports: [OriginInjectorHostComponent] })
    const fixture = TestBed.createComponent(OriginInjectorHostComponent)
    fixture.detectChanges()

    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    const target = fixture.nativeElement.querySelector('[data-testid="origin-target"]') as HTMLElement
    expect(target.querySelector('[data-testid="origin-projected"]')).not.toBeNull()
    expect(originSentinelCapture.tokenValue).toBe('from-origin')
    expect(originSentinelCapture.originValue).toBe('origin-only')

    fixture.destroy()
  })

  it('passes originInjector to ViewContainerRef.createEmbeddedView', async () => {
    TestBed.configureTestingModule({ imports: [CreateEmbeddedViewSpyHostComponent] })
    const fixture = TestBed.createComponent(CreateEmbeddedViewSpyHostComponent)
    fixture.detectChanges()

    await flushPortalRender(fixture)

    expect(fixture.componentInstance.createEmbeddedView).toHaveBeenCalledTimes(1)
    expect(fixture.componentInstance.createEmbeddedView?.mock.calls[0]?.[2]).toEqual({
      injector: fixture.componentInstance.originInjector,
    })

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

  it('moves projected DOM when the target is supplied after mount', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.showPortal.set(true)
    fixture.detectChanges()

    await flushPortalRender(fixture)

    const target = fixture.nativeElement.querySelector('[data-testid="portal-target"]') as HTMLElement
    expect(target.querySelector('[data-testid="projected"]')).toBeNull()

    fixture.componentInstance.target.set(target)
    fixture.detectChanges()
    await flushPortalRender(fixture)

    expect(target.querySelector('[data-testid="projected"]')).not.toBeNull()

    fixture.destroy()
  })

  it('moves projected DOM between target elements and detaches when target becomes null', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const firstTarget = fixture.nativeElement.querySelector('[data-testid="portal-target"]') as HTMLElement
    const secondTarget = document.createElement('div')
    fixture.nativeElement.appendChild(secondTarget)

    fixture.componentInstance.target.set(firstTarget)
    fixture.componentInstance.showPortal.set(true)
    fixture.detectChanges()
    await flushPortalRender(fixture)

    expect(firstTarget.querySelector('[data-testid="projected"]')).not.toBeNull()

    fixture.componentInstance.target.set(secondTarget)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(firstTarget.querySelector('[data-testid="projected"]')).toBeNull()
    const projected = secondTarget.querySelector('[data-testid="projected"]') as HTMLElement
    expect(projected).not.toBeNull()

    fixture.componentInstance.target.set(null)
    fixture.detectChanges()
    await flushPortalRender(fixture)

    expect(secondTarget.querySelector('[data-testid="projected"]')).toBeNull()
    expect(projected.isConnected).toBe(false)
    expect(projected.parentNode).toBeInstanceOf(DocumentFragment)

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
