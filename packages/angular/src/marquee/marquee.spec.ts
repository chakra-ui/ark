import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MachineStatus } from '@zag-js/core'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_MARQUEE_CONTEXT,
  ArkMarqueeContent,
  ArkMarqueeContext,
  ArkMarqueeEdge,
  ArkMarqueeItem,
  ArkMarqueeRoot,
  ArkMarqueeRootProvider,
  ArkMarqueeViewport,
  injectArkMarqueeContext,
  marqueeAnatomy,
  useMarquee,
  type MarqueeApi,
  type MarqueeContentMachineProps,
  type MarqueeDimensionSnapshot,
  type MarqueeEdgeMachineProps,
  type MarqueeElementIds,
  type MarqueeIntlTranslations,
  type MarqueeMachine,
  type MarqueeMachineProps,
  type MarqueeOrientation,
  type MarqueePauseStatusDetails,
  type MarqueeService,
  type MarqueeSide,
  type MarqueeUserDefinedContext,
  type UseMarqueeOptions,
  type UseMarqueeProps,
  type UseMarqueeReturn,
} from '@ark-ui/angular/marquee'
import { MarqueeBasicExample } from './examples/basic'
import { MarqueeAutoFillExample } from './examples/auto-fill'
import { MarqueeFiniteLoopsExample } from './examples/finite-loops'
import { MarqueePauseOnInteractionExample } from './examples/pause-on-interaction'
import { MarqueeProgrammaticControlExample } from './examples/programmatic-control'
import { MarqueeReverseExample } from './examples/reverse'
import { MarqueeRootProviderExample } from './examples/root-provider'
import { MarqueeSpeedExample } from './examples/speed'
import { MarqueeVerticalExample } from './examples/vertical'
import { MarqueeWithEdgesExample } from './examples/with-edges'

type MarqueePublicTypeSmoke = [
  MarqueeApi,
  MarqueeContentMachineProps,
  MarqueeDimensionSnapshot,
  MarqueeEdgeMachineProps,
  MarqueeElementIds,
  MarqueeIntlTranslations,
  MarqueeMachine,
  MarqueeMachineProps,
  MarqueeOrientation,
  MarqueePauseStatusDetails,
  MarqueeService,
  MarqueeSide,
  MarqueeUserDefinedContext,
  UseMarqueeOptions,
  UseMarqueeProps,
  UseMarqueeReturn,
]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

@Directive({ selector: '[marqueeProbe]', standalone: true, exportAs: 'marqueeProbe' })
class MarqueeProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseMarqueeReturn {
    return this._injector.get(ARK_MARQUEE_CONTEXT)
  }
}

describe('@ark-ui/angular/marquee', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_MARQUEE_CONTEXT).toBe('object')
    expect(typeof injectArkMarqueeContext).toBe('function')
    expect(typeof useMarquee).toBe('function')
    expect(typeof marqueeAnatomy).toBe('object')
    expect(ArkMarqueeRoot).toBeDefined()
    expect(ArkMarqueeRootProvider).toBeDefined()
    expect(ArkMarqueeViewport).toBeDefined()
    expect(ArkMarqueeContent).toBeDefined()
    expect(ArkMarqueeItem).toBeDefined()
    expect(ArkMarqueeEdge).toBeDefined()
    expect(ArkMarqueeContext).toBeDefined()
    expect(MarqueeAutoFillExample).toBeDefined()
    expect(MarqueeBasicExample).toBeDefined()
    expect(MarqueeFiniteLoopsExample).toBeDefined()
    expect(MarqueePauseOnInteractionExample).toBeDefined()
    expect(MarqueeProgrammaticControlExample).toBeDefined()
    expect(MarqueeReverseExample).toBeDefined()
    expect(MarqueeRootProviderExample).toBeDefined()
    expect(MarqueeSpeedExample).toBeDefined()
    expect(MarqueeVerticalExample).toBeDefined()
    expect(MarqueeWithEdgesExample).toBeDefined()
    expect(undefined as MarqueePublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useMarquee({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useMarquee({ context: () => ({}) }))
    const id = (result.api().getRootProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/marquee::/)

    fixture.destroy()
  })

  it('descendant probes receive the marquee context from the root directive', () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot, MarqueeProbe],
      template: '<div arkMarquee><span marqueeProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkMarqueeRoot)).injector.get(ArkMarqueeRoot)
    const probe = fixture.debugElement.query(By.directive(MarqueeProbe)).injector.get(MarqueeProbe)

    expect(probe.captured).toBe(root)

    fixture.destroy()
  })

  it('orphan [arkMarqueeViewport] without ancestor [arkMarquee] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeViewport],
      template: '<div arkMarqueeViewport></div>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_MARQUEE_CONTEXT|No provider|NG0201/i)
  })

  it('applies orientation, reverse, pause, edge, content, and item data attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem, ArkMarqueeEdge],
      template: `
        <div arkMarquee id="ticker" side="bottom" reverse defaultPaused class="root">
          <div arkMarqueeEdge side="bottom"></div>
          <div arkMarqueeViewport>
            <div arkMarqueeContent [index]="0">
              <span arkMarqueeItem>One</span>
            </div>
            <div arkMarqueeContent [index]="1">
              <span arkMarqueeItem>Two</span>
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.nativeElement.querySelector('[data-part="root"]') as HTMLElement
    const viewport = fixture.nativeElement.querySelector('[data-part="viewport"]') as HTMLElement
    const edge = fixture.nativeElement.querySelector('[data-part="edge"]') as HTMLElement
    const contents = fixture.nativeElement.querySelectorAll('[data-part="content"]') as NodeListOf<HTMLElement>
    const item = fixture.nativeElement.querySelector('[data-part="item"]') as HTMLElement

    expect(root.id).toBe('marquee:ticker')
    expect(root.getAttribute('data-orientation')).toBe('vertical')
    expect(root.getAttribute('data-state')).toBe('paused')
    expect(root.getAttribute('data-paused')).toBe('')
    expect(viewport.getAttribute('data-side')).toBe('bottom')
    expect(edge.getAttribute('data-side')).toBe('bottom')
    expect(edge.getAttribute('data-orientation')).toBe('vertical')
    expect(contents[0]?.getAttribute('data-index')).toBe('0')
    expect(contents[0]?.getAttribute('data-reverse')).toBe('')
    expect(contents[1]?.getAttribute('data-clone')).toBe('')
    expect(contents[1]?.getAttribute('aria-hidden')).toBe('true')
    expect(item.getAttribute('dir')).toBe('ltr')

    fixture.destroy()
  })

  it('programmatic pause, resume, toggle, and restart controls update state and preserve restart behavior', async () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent, ArkMarqueeItem],
      template: `
        <div arkMarquee (pausedChange)="pausedChanges.push($event)" (pauseDetailsChange)="detailChanges.push($event)">
          <div arkMarqueeViewport>
            <div arkMarqueeContent>
              <span arkMarqueeItem>One</span>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly pausedChanges: Array<boolean | undefined> = []
      readonly detailChanges: MarqueePauseStatusDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkMarqueeRoot)).injector.get(ArkMarqueeRoot)
    const content = fixture.debugElement.query(By.directive(ArkMarqueeContent)).nativeElement as HTMLElement
    const offsetSpy = vi.spyOn(content, 'offsetHeight', 'get').mockReturnValue(10)

    root.api().pause()
    await flush(fixture)
    expect(root.api().paused).toBe(true)
    expect(fixture.componentInstance.pausedChanges).toEqual([true])
    expect(fixture.componentInstance.detailChanges).toEqual([{ paused: true }])

    root.api().resume()
    await flush(fixture)
    expect(root.api().paused).toBe(false)
    expect(fixture.componentInstance.pausedChanges).toEqual([true, false])
    expect(fixture.componentInstance.detailChanges).toEqual([{ paused: true }, { paused: false }])

    root.api().togglePause()
    await flush(fixture)
    expect(root.api().paused).toBe(true)

    root.api().restart()
    expect(offsetSpy).toHaveBeenCalled()
    expect(content.style.animation).toBe('')

    fixture.destroy()
  })

  it('controlled [(paused)] round-trips once for programmatic pause', async () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot],
      template: '<div arkMarquee [(paused)]="paused" (pausedChange)="changes.push($event)"></div>',
    })
    class Host {
      readonly paused = signal<boolean | undefined>(false)
      readonly changes: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkMarqueeRoot)).injector.get(ArkMarqueeRoot)
    root.api().pause()
    await flush(fixture)
    root.api().pause()
    await flush(fixture)

    expect(fixture.componentInstance.paused()).toBe(true)
    expect(fixture.componentInstance.changes).toEqual([true])

    fixture.destroy()
  })

  it('removes pause-on-interaction listeners and stops the service on destroy', async () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot],
      template: '<div arkMarquee pauseOnInteraction></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkMarqueeRoot)).injector.get(ArkMarqueeRoot)
    const element = fixture.nativeElement.querySelector('[data-part="root"]') as HTMLElement

    element.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
    await flush(fixture)
    expect(root.api().paused).toBe(true)

    fixture.destroy()
    expect(root.service.getStatus()).toBe(MachineStatus.Stopped)

    element.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }))
    expect(root.api().paused).toBe(true)
  })

  it('constructs on the server platform without direct document/window access', () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRoot, ArkMarqueeViewport, ArkMarqueeContent],
      template: `
        <div arkMarquee>
          <div arkMarqueeViewport>
            <div arkMarqueeContent></div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).not.toThrow()
    fixture.destroy()
  })

  it('root-provider applies supplied machine props and serves descendants from the same context', async () => {
    @Component({
      standalone: true,
      imports: [ArkMarqueeRootProvider, ArkMarqueeViewport, ArkMarqueeContent, MarqueeProbe],
      template: `
        <div arkMarqueeRootProvider [value]="marquee" marqueeProbe>
          <div arkMarqueeViewport>
            <div arkMarqueeContent></div>
          </div>
        </div>
      `,
    })
    class Host {
      private readonly injector = inject(Injector)
      readonly marquee = runInInjectionContext(this.injector, () =>
        useMarquee({ context: () => ({ id: 'external', defaultPaused: true, side: 'end' }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const provider = fixture.debugElement
      .query(By.directive(ArkMarqueeRootProvider))
      .injector.get(ArkMarqueeRootProvider)
    const probe = fixture.debugElement.query(By.directive(MarqueeProbe)).injector.get(MarqueeProbe)
    const root = fixture.nativeElement.querySelector('[data-part="root"]') as HTMLElement
    const viewport = fixture.nativeElement.querySelector('[data-part="viewport"]') as HTMLElement

    expect(provider.api().paused).toBe(true)
    expect(probe.captured).toBe(provider)
    expect(root.id).toBe('marquee:external')
    expect(root.getAttribute('data-state')).toBe('paused')
    expect(viewport.getAttribute('data-side')).toBe('end')

    fixture.destroy()
  })

  it('renders Storybook examples with React-matching labels and contextual auto-fill content', async () => {
    @Component({
      standalone: true,
      imports: [MarqueeAutoFillExample, MarqueeFiniteLoopsExample, MarqueeSpeedExample],
      template: `
        <marquee-auto-fill-example />
        <marquee-finite-loops-example />
        <marquee-speed-example />
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const text = fixture.nativeElement.textContent as string
    expect(text).toContain('Loop completed: 0 times')
    expect(text).toContain('Animation completed: 0 times')
    expect(text).toContain('Slow (25px/s)')
    expect(text).toContain('Normal (50px/s)')
    expect(text).toContain('Fast (100px/s)')

    const autoFill = fixture.debugElement.query(By.css('marquee-auto-fill-example'))
    const autoFillRoot = autoFill.query(By.directive(ArkMarqueeRoot)).injector.get(ArkMarqueeRoot)
    const autoFillContents = autoFill.queryAll(By.directive(ArkMarqueeContent))
    expect(autoFillContents.length).toBe(autoFillRoot.api().contentCount)
    expect(autoFillContents.length).toBeGreaterThan(0)

    fixture.destroy()
  })
})
