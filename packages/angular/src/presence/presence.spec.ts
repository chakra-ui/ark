import {
  Component,
  Directive,
  EnvironmentInjector,
  Injector,
  InjectionToken,
  ViewChild,
  inject,
  signal,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import { ArkPresenceComponent } from './presence'

const PRESENCE_TOKEN = new InjectionToken<string>('PRESENCE_TOKEN')
const ORIGIN_TOKEN = new InjectionToken<string>('ORIGIN_TOKEN')

const sentinelCapture: { tokenValue: string | null } = {
  tokenValue: null,
}

const originSentinelCapture: { tokenValue: string | null; originValue: string | null } = {
  tokenValue: null,
  originValue: null,
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

@Directive({
  standalone: true,
  selector: '[originSentinel]',
})
class OriginSentinelDirective {
  constructor() {
    originSentinelCapture.tokenValue = inject(PRESENCE_TOKEN, { optional: true })
    originSentinelCapture.originValue = inject(ORIGIN_TOKEN, { optional: true })
  }
}

@Component({
  standalone: true,
  imports: [ArkPresenceComponent, OriginSentinelDirective],
  providers: [{ provide: PRESENCE_TOKEN, useValue: 'from-host' }],
  template: `
    <ark-presence
      [present]="present()"
      [lazyMount]="lazyMount()"
      [unmountOnExit]="unmountOnExit()"
      [skipAnimationOnMount]="skipAnimationOnMount()"
      [originInjector]="originInjector"
    >
      <ng-template>
        <span data-testid="origin-content" originSentinel>Origin</span>
      </ng-template>
    </ark-presence>
  `,
})
class OriginInjectorHostComponent {
  @ViewChild(ArkPresenceComponent) presenceRef!: ArkPresenceComponent
  readonly present = signal(false)
  readonly lazyMount = signal(false)
  readonly unmountOnExit = signal(false)
  readonly skipAnimationOnMount = signal(false)
  readonly originInjector = Injector.create({
    providers: [
      { provide: PRESENCE_TOKEN, useValue: 'from-origin' },
      { provide: ORIGIN_TOKEN, useValue: 'origin-only' },
    ],
    parent: inject(EnvironmentInjector),
  })
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
const nextAnimationFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve(null)))

describe('ArkPresenceComponent', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    sentinelCapture.tokenValue = null
    originSentinelCapture.tokenValue = null
    originSentinelCapture.originValue = null
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

  it('renders hidden closed content initially when lazyMount is false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.detectChanges()

    const content = queryContent(fixture.nativeElement) as HTMLElement
    expect(content).not.toBeNull()
    const presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    expect(presenceNode.hidden).toBe(true)
    expect(presenceNode.getAttribute('data-state')).toBe('closed')
    expect(fixture.componentInstance.presenceRef.status()).toBe('closed')

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
    const content = queryContent(fixture.nativeElement) as HTMLElement
    expect(content).not.toBeNull()
    const presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    expect(presenceNode.hidden).toBe(false)

    fixture.componentInstance.unmountOnExit.set(true)
    fixture.detectChanges()
    presenceNode.dispatchEvent(new Event('animationend', { bubbles: true }))
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')
    expect(queryContent(fixture.nativeElement)).toBeNull()

    fixture.destroy()
  })

  it('completes unmountOnExit automatically when no exit motion is active', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.componentInstance.unmountOnExit.set(true)
    fixture.detectChanges()

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('exiting')
    expect(queryContent(fixture.nativeElement)).not.toBeNull()

    await nextAnimationFrame()
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')
    expect(queryContent(fixture.nativeElement)).toBeNull()

    fixture.destroy()
  })

  it('keeps content mounted but hidden after exit when unmountOnExit is false', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    const content = queryContent(fixture.nativeElement) as HTMLElement
    expect(content).not.toBeNull()
    expect(fixture.componentInstance.presenceRef.status()).toBe('closed')
    expect((content.closest('[data-scope="presence"]') as HTMLElement).hidden).toBe(true)

    fixture.destroy()
  })

  it('ignores bubbled child animation and transition events while exiting', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()

    const content = queryContent(fixture.nativeElement) as HTMLElement
    content.dispatchEvent(new Event('animationend', { bubbles: true }))
    content.dispatchEvent(new Event('transitionend', { bubbles: true }))
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('exiting')

    const presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    presenceNode.dispatchEvent(new Event('animationend', { bubbles: true }))
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.status()).toBe('closed')

    fixture.destroy()
  })

  it('omits the initial open data-state when skipAnimationOnMount is true', () => {
    @Component({
      standalone: true,
      imports: [ArkPresenceComponent],
      template: `
        <ark-presence present skipAnimationOnMount>
          <ng-template><span data-testid="content">Hello</span></ng-template>
        </ark-presence>
      `,
    })
    class SkipAnimationHostComponent {}

    TestBed.configureTestingModule({ imports: [SkipAnimationHostComponent] })
    const fixture = TestBed.createComponent(SkipAnimationHostComponent)
    fixture.detectChanges()

    const content = queryContent(fixture.nativeElement) as HTMLElement
    const presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    expect(presenceNode.getAttribute('data-state')).toBeNull()

    fixture.destroy()
  })

  it('restores open data-state on later enters when skipAnimationOnMount is true', () => {
    @Component({
      standalone: true,
      imports: [ArkPresenceComponent],
      template: `
        <ark-presence [present]="present()" skipAnimationOnMount>
          <ng-template><span data-testid="content">Hello</span></ng-template>
        </ark-presence>
      `,
    })
    class SkipAnimationHostComponent {
      readonly present = signal(true)
    }

    TestBed.configureTestingModule({ imports: [SkipAnimationHostComponent] })
    const fixture = TestBed.createComponent(SkipAnimationHostComponent)
    fixture.detectChanges()

    let content = queryContent(fixture.nativeElement) as HTMLElement
    let presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    expect(presenceNode.getAttribute('data-state')).toBeNull()

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    content = queryContent(fixture.nativeElement) as HTMLElement
    presenceNode = content.closest('[data-scope="presence"]') as HTMLElement
    expect(presenceNode.getAttribute('data-state')).toBe('open')

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

    fixture.componentInstance.unmountOnExit.set(true)
    fixture.detectChanges()
    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    expect(emitted).toBe(1)
    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')

    fixture.destroy()
  })

  it('maps the immediate boolean input from a bare attribute', () => {
    @Component({
      standalone: true,
      imports: [ArkPresenceComponent],
      template: `
        <ark-presence immediate>
          <ng-template><span data-testid="content">Hello</span></ng-template>
        </ark-presence>
      `,
    })
    class ImmediateHostComponent {
      @ViewChild(ArkPresenceComponent) presenceRef!: ArkPresenceComponent
    }

    TestBed.configureTestingModule({ imports: [ImmediateHostComponent] })
    const fixture = TestBed.createComponent(ImmediateHostComponent)
    fixture.detectChanges()

    expect(fixture.componentInstance.presenceRef.immediate()).toBe(true)

    fixture.destroy()
  })

  it('preserves host provider context across enter and exit lifecycles', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-host')

    sentinelCapture.tokenValue = null
    fixture.componentInstance.unmountOnExit.set(true)
    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()

    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(sentinelCapture.tokenValue).toBe('from-host')

    fixture.destroy()
  })

  it('resolves origin injector tokens on initial mount when originInjector is supplied', () => {
    TestBed.configureTestingModule({ imports: [OriginInjectorHostComponent] })
    const fixture = TestBed.createComponent(OriginInjectorHostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="origin-content"]')).not.toBeNull()
    expect(originSentinelCapture.tokenValue).toBe('from-origin')
    expect(originSentinelCapture.originValue).toBe('origin-only')

    fixture.destroy()
  })

  it('preserves origin injector tokens across exit, unmount, and remount', () => {
    TestBed.configureTestingModule({ imports: [OriginInjectorHostComponent] })
    const fixture = TestBed.createComponent(OriginInjectorHostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(originSentinelCapture.tokenValue).toBe('from-origin')
    expect(originSentinelCapture.originValue).toBe('origin-only')

    fixture.componentInstance.present.set(false)
    fixture.detectChanges()
    expect(fixture.componentInstance.presenceRef.status()).toBe('exiting')
    expect(fixture.nativeElement.querySelector('[data-testid="origin-content"]')).not.toBeNull()

    fixture.componentInstance.unmountOnExit.set(true)
    fixture.detectChanges()
    fixture.componentInstance.presenceRef.onExitComplete()
    fixture.detectChanges()
    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')
    expect(fixture.nativeElement.querySelector('[data-testid="origin-content"]')).toBeNull()

    originSentinelCapture.tokenValue = null
    originSentinelCapture.originValue = null

    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="origin-content"]')).not.toBeNull()
    expect(originSentinelCapture.tokenValue).toBe('from-origin')
    expect(originSentinelCapture.originValue).toBe('origin-only')

    fixture.destroy()
  })

  it('preserves origin injector tokens after lazy mount with skipAnimationOnMount', () => {
    TestBed.configureTestingModule({ imports: [OriginInjectorHostComponent] })
    const fixture = TestBed.createComponent(OriginInjectorHostComponent)
    fixture.componentInstance.lazyMount.set(true)
    fixture.componentInstance.skipAnimationOnMount.set(true)
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('[data-testid="origin-content"]')).toBeNull()
    expect(fixture.componentInstance.presenceRef.status()).toBe('unmounted')

    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    const content = fixture.nativeElement.querySelector('[data-testid="origin-content"]') as HTMLElement
    expect(content).not.toBeNull()
    expect(originSentinelCapture.tokenValue).toBe('from-origin')
    expect(originSentinelCapture.originValue).toBe('origin-only')
    expect((content.closest('[data-scope="presence"]') as HTMLElement).getAttribute('data-state')).toBe('open')

    fixture.destroy()
  })

  it('applies display: contents on the host element', () => {
    TestBed.configureTestingModule({ imports: [HostComponent] })
    const fixture = TestBed.createComponent(HostComponent)
    fixture.componentInstance.present.set(true)
    fixture.detectChanges()

    const host = fixture.nativeElement.querySelector('ark-presence') as HTMLElement
    expect(getComputedStyle(host).display).toBe('contents')

    fixture.destroy()
  })
})
