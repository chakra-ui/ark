import { ApplicationRef, Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_SPLITTER_CONTEXT,
  ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT,
  ArkSplitterPanel,
  ArkSplitterResizeTrigger,
  ArkSplitterResizeTriggerIndicator,
  ArkSplitterRoot,
  ArkSplitterRootProvider,
  createSplitterRegistry,
  getSplitterLayout,
  injectArkSplitterContext,
  injectArkSplitterResizeTriggerContext,
  splitterAnatomy,
  useSplitter,
  type ArkSplitterResizeTriggerContext,
  type SplitterApi,
  type SplitterElementIds,
  type SplitterExpandCollapseDetails,
  type SplitterMachine,
  type SplitterMachineProps,
  type SplitterPanelData,
  type SplitterPanelProps,
  type SplitterResizeDetails,
  type SplitterResizeEndDetails,
  type SplitterResizeTriggerProps,
  type SplitterResizeTriggerState,
  type SplitterRegistryOptions,
  type SplitterService,
  type UseSplitterOptions,
  type UseSplitterProps,
  type UseSplitterReturn,
} from '@ark-ui/angular/splitter'

type SplitterPublicTypeSmoke = [
  ArkSplitterResizeTriggerContext,
  SplitterApi,
  SplitterElementIds,
  SplitterExpandCollapseDetails,
  SplitterMachine,
  SplitterMachineProps,
  SplitterPanelData,
  SplitterPanelProps,
  SplitterResizeDetails,
  SplitterResizeEndDetails,
  SplitterResizeTriggerProps,
  SplitterResizeTriggerState,
  SplitterRegistryOptions,
  SplitterService,
  UseSplitterOptions,
  UseSplitterProps,
  UseSplitterReturn,
]

const panels: SplitterPanelData[] = [{ id: 'a' }, { id: 'b' }]

const flush = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await Promise.resolve()
  fixture.detectChanges()
}

function dispatchPointerEvent(target: EventTarget, type: string, init: Record<string, unknown> = {}): void {
  const event = new Event(type, { bubbles: true, cancelable: true }) as Event & Record<string, unknown>
  for (const [key, value] of Object.entries(init)) {
    Object.defineProperty(event, key, { configurable: true, value })
  }
  target.dispatchEvent(event)
}

function installPointerCaptureMocks(element: HTMLElement): void {
  element.setPointerCapture = vi.fn()
  element.releasePointerCapture = vi.fn()
  element.hasPointerCapture = vi.fn(() => true)
}

@Directive({ selector: '[splitterProbe]', standalone: true, exportAs: 'splitterProbe' })
class SplitterProbe {
  private readonly injector = inject(Injector)
  get captured(): UseSplitterReturn {
    return this.injector.get(ARK_SPLITTER_CONTEXT)
  }
}

@Directive({ selector: '[splitterTriggerProbe]', standalone: true, exportAs: 'splitterTriggerProbe' })
class SplitterTriggerProbe {
  readonly context = injectArkSplitterResizeTriggerContext()
}

describe('@ark-ui/angular/src/splitter', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_SPLITTER_CONTEXT).toBe('object')
    expect(typeof ARK_SPLITTER_RESIZE_TRIGGER_CONTEXT).toBe('object')
    expect(typeof injectArkSplitterContext).toBe('function')
    expect(typeof injectArkSplitterResizeTriggerContext).toBe('function')
    expect(typeof useSplitter).toBe('function')
    expect(typeof createSplitterRegistry).toBe('function')
    expect(typeof getSplitterLayout).toBe('function')
    expect(typeof splitterAnatomy).toBe('object')
    expect(ArkSplitterRoot).toBeDefined()
    expect(ArkSplitterRootProvider).toBeDefined()
    expect(ArkSplitterPanel).toBeDefined()
    expect(ArkSplitterResizeTrigger).toBeDefined()
    expect(ArkSplitterResizeTriggerIndicator).toBeDefined()
    expect(undefined as SplitterPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useSplitter creates api, state, service, and send with a fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () =>
      useSplitter({ context: () => ({ panels }) }),
    )
    const rootProps = result.api().getRootProps() as { id?: unknown }

    expect(typeof rootProps.id).toBe('string')
    expect(rootProps.id).toMatch(/splitter::/)
    expect(typeof result.state()).toBe('object')
    expect(typeof result.service.send).toBe('function')
    expect(result.send).toBe(result.service.send)

    fixture.destroy()
  })

  it('applies panel size and ownership attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter [panels]="panels" [defaultSize]="[25, 75]">
          <section arkSplitterPanel id="a">A</section>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <section arkSplitterPanel id="b">B</section>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkSplitterRoot)).nativeElement as HTMLElement
    const panelEls = fixture.debugElement.queryAll(By.directive(ArkSplitterPanel)).map((debug) => debug.nativeElement)
    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement

    expect(rootEl.getAttribute('data-scope')).toBe('splitter')
    expect(rootEl.getAttribute('data-orientation')).toBe('horizontal')
    expect(panelEls[0].getAttribute('data-id')).toBe('a')
    expect(panelEls[0].getAttribute('data-index')).toBe('0')
    expect(panelEls[1].getAttribute('data-id')).toBe('b')
    expect(panelEls[1].getAttribute('data-index')).toBe('1')
    expect(trigger.getAttribute('aria-valuenow')).toBe('25')
    expect(trigger.getAttribute('aria-controls')).toContain(panelEls[0].id)
    expect(trigger.getAttribute('aria-controls')).toContain(panelEls[1].id)

    fixture.destroy()
  })

  it('resizes panels from keyboard events', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter [panels]="panels" [size]="size()" (sizeChange)="size.set($event)" [keyboardResizeBy]="10">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
      readonly size = signal([50, 50])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement
    trigger.focus()
    await flush(fixture)

    trigger.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, cancelable: true, key: 'ArrowRight' }))
    await flush(fixture)

    expect(fixture.componentInstance.size()).toEqual([60, 40])

    fixture.destroy()
  })

  it('resizes panels from pointer events with controlled coordinates', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter [panels]="panels" [size]="size()" (sizeChange)="size.set($event)">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
      readonly size = signal([50, 50])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkSplitterRoot)).nativeElement as HTMLElement
    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement
    vi.spyOn(rootEl, 'getBoundingClientRect').mockReturnValue({ height: 100, width: 200 } as DOMRect)
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ height: 10, width: 10 } as DOMRect)
    installPointerCaptureMocks(trigger)

    dispatchPointerEvent(trigger, 'pointerdown', { button: 0, clientX: 100, clientY: 0, pointerId: 1 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointermove', { clientX: 120, clientY: 0, pointerId: 1 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointerup', { clientX: 120, clientY: 0, pointerId: 1 })
    await flush(fixture)

    expect(fixture.componentInstance.size()).toEqual([60, 40])

    fixture.destroy()
  })

  it('collapses and expands collapsible panels', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter #root="arkSplitter" [panels]="panels" [defaultSize]="[20, 80]">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels: SplitterPanelData[] = [
        { id: 'a', collapsible: true, collapsedSize: 5, minSize: 10 },
        { id: 'b' },
      ]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkSplitterRoot)).injector.get(ArkSplitterRoot)
    root.api().collapsePanel('a')
    await flush(fixture)
    expect(root.api().isPanelCollapsed('a')).toBe(true)
    expect(root.api().getPanelSize('a')).toBe(5)

    root.api().expandPanel('a')
    await flush(fixture)
    expect(root.api().isPanelExpanded('a')).toBe(true)
    expect(root.api().getPanelSize('a')).toBeGreaterThan(5)

    fixture.destroy()
  })

  it('supports vertical orientation', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter orientation="vertical" [panels]="panels">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkSplitterRoot)).nativeElement as HTMLElement
    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement

    expect(rootEl.getAttribute('data-orientation')).toBe('vertical')
    expect(rootEl.style.flexDirection).toBe('column')
    expect(trigger.getAttribute('aria-orientation')).toBe('vertical')

    fixture.destroy()
  })

  it('isolates nested splitter contexts', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger, SplitterProbe],
      template: `
        <div arkSplitter [panels]="outerPanels">
          <div arkSplitterPanel id="outer-a">
            <span splitterProbe #outerProbe="splitterProbe"></span>
            <div arkSplitter orientation="vertical" [panels]="innerPanels">
              <div arkSplitterPanel id="inner-a"><span splitterProbe #innerProbe="splitterProbe"></span></div>
              <button arkSplitterResizeTrigger id="inner-a:inner-b" aria-label="Resize"></button>
              <div arkSplitterPanel id="inner-b">Inner B</div>
            </div>
          </div>
          <button arkSplitterResizeTrigger id="outer-a:outer-b" aria-label="Resize"></button>
          <div arkSplitterPanel id="outer-b">Outer B</div>
        </div>
      `,
    })
    class Host {
      readonly outerPanels: SplitterPanelData[] = [{ id: 'outer-a' }, { id: 'outer-b' }]
      readonly innerPanels: SplitterPanelData[] = [{ id: 'inner-a' }, { id: 'inner-b' }]
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const roots = fixture.debugElement
      .queryAll(By.directive(ArkSplitterRoot))
      .map((debug) => debug.injector.get(ArkSplitterRoot))
    const probes = fixture.debugElement
      .queryAll(By.directive(SplitterProbe))
      .map((debug) => debug.injector.get(SplitterProbe))

    expect(probes[0].captured).toBe(roots[0])
    expect(probes[1].captured).toBe(roots[1])
    expect(probes[0].captured).not.toBe(probes[1].captured)

    fixture.destroy()
  })

  it('provides resize trigger context to indicators', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkSplitterRoot,
        ArkSplitterPanel,
        ArkSplitterResizeTrigger,
        ArkSplitterResizeTriggerIndicator,
        SplitterTriggerProbe,
      ],
      template: `
        <div arkSplitter [panels]="panels">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize">
            <span arkSplitterResizeTriggerIndicator splitterTriggerProbe></span>
          </button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const probe = fixture.debugElement.query(By.directive(SplitterTriggerProbe)).injector.get(SplitterTriggerProbe)
    const indicator = fixture.debugElement.query(By.directive(ArkSplitterResizeTriggerIndicator))
      .nativeElement as HTMLElement

    expect(probe.context.id()).toBe('a:b')
    expect(probe.context.state().disabled).toBe(false)
    expect(indicator.getAttribute('data-ownedby')).toBeTruthy()

    fixture.destroy()
  })

  it('root provider proxies an externally-created splitter machine', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRootProvider, ArkSplitterPanel, ArkSplitterResizeTrigger, SplitterProbe],
      template: `
        <div arkSplitterRootProvider [value]="splitter">
          <span splitterProbe></span>
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly splitter = runInInjectionContext(inject(Injector), () =>
        useSplitter({ context: () => ({ defaultSize: [30, 70], panels }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const provider = fixture.debugElement
      .query(By.directive(ArkSplitterRootProvider))
      .injector.get(ArkSplitterRootProvider)
    const probe = fixture.debugElement.query(By.directive(SplitterProbe)).injector.get(SplitterProbe)
    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement

    expect(probe.captured).toBe(provider)
    expect(provider.api().getSizes()).toEqual([30, 70])
    expect(trigger.getAttribute('aria-valuenow')).toBe('30')

    fixture.destroy()
  })

  it('cleans up pointer move listeners when destroyed', async () => {
    @Component({
      standalone: true,
      imports: [ArkSplitterRoot, ArkSplitterPanel, ArkSplitterResizeTrigger],
      template: `
        <div arkSplitter [panels]="panels" [size]="size()" (sizeChange)="size.set($event)">
          <div arkSplitterPanel id="a">A</div>
          <button arkSplitterResizeTrigger id="a:b" aria-label="Resize"></button>
          <div arkSplitterPanel id="b">B</div>
        </div>
      `,
    })
    class Host {
      readonly panels = panels
      readonly size = signal([50, 50])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkSplitterRoot)).nativeElement as HTMLElement
    const trigger = fixture.debugElement.query(By.directive(ArkSplitterResizeTrigger)).nativeElement as HTMLElement
    vi.spyOn(rootEl, 'getBoundingClientRect').mockReturnValue({ height: 100, width: 200 } as DOMRect)
    vi.spyOn(trigger, 'getBoundingClientRect').mockReturnValue({ height: 10, width: 10 } as DOMRect)
    installPointerCaptureMocks(trigger)

    dispatchPointerEvent(trigger, 'pointerdown', { button: 0, clientX: 100, clientY: 0, pointerId: 1 })
    await flush(fixture)
    fixture.destroy()

    dispatchPointerEvent(document, 'pointermove', { clientX: 150, clientY: 0, pointerId: 1 })
    await Promise.resolve()

    expect(fixture.componentInstance.size()).toEqual([50, 50])
  })
})
