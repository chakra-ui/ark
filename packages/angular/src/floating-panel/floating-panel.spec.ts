import {
  ApplicationRef,
  Component,
  Directive,
  InjectionToken,
  Injector,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed, type ComponentFixture } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_FLOATING_PANEL_CONTEXT,
  ARK_FLOATING_PANEL_CONTEXT_CARRIER,
  ArkFloatingPanelBody,
  ArkFloatingPanelCloseTrigger,
  ArkFloatingPanelContent,
  ArkFloatingPanelContext,
  ArkFloatingPanelControl,
  ArkFloatingPanelDragTrigger,
  ArkFloatingPanelHeader,
  ArkFloatingPanelPositioner,
  ArkFloatingPanelResizeTrigger,
  ArkFloatingPanelRoot,
  ArkFloatingPanelRootProvider,
  ArkFloatingPanelStageTrigger,
  ArkFloatingPanelTitle,
  ArkFloatingPanelTrigger,
  floatingPanelAnatomy,
  injectArkFloatingPanelContext,
  injectArkFloatingPanelContextCarrier,
  useFloatingPanel,
  type FloatingPanelAnchorPositionDetails,
  type FloatingPanelApi,
  type FloatingPanelContextTemplate,
  type FloatingPanelElementIds,
  type FloatingPanelIntlTranslations,
  type FloatingPanelMachine,
  type FloatingPanelMachineProps,
  type FloatingPanelOpenChangeDetails,
  type FloatingPanelPoint,
  type FloatingPanelPositionChangeDetails,
  type FloatingPanelResizeTriggerAxis,
  type FloatingPanelResizeTriggerProps,
  type FloatingPanelService,
  type FloatingPanelSize,
  type FloatingPanelSizeChangeDetails,
  type FloatingPanelStage,
  type FloatingPanelStageChangeDetails,
  type FloatingPanelStageTriggerProps,
  type UseFloatingPanelOptions,
  type UseFloatingPanelProps,
  type UseFloatingPanelReturn,
} from '@ark-ui/angular/floating-panel'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { FloatingPanelBasicExample } from './examples/basic'
import { FloatingPanelLazyMountExample } from './examples/lazy-mount'
import { FloatingPanelRootProviderExample } from './examples/root-provider'

type FloatingPanelPublicTypeSmoke = [
  FloatingPanelAnchorPositionDetails,
  FloatingPanelApi,
  FloatingPanelContextTemplate,
  FloatingPanelElementIds,
  FloatingPanelIntlTranslations,
  FloatingPanelMachine,
  FloatingPanelMachineProps,
  FloatingPanelOpenChangeDetails,
  FloatingPanelPoint,
  FloatingPanelPositionChangeDetails,
  FloatingPanelResizeTriggerAxis,
  FloatingPanelResizeTriggerProps,
  FloatingPanelService,
  FloatingPanelSize,
  FloatingPanelSizeChangeDetails,
  FloatingPanelStage,
  FloatingPanelStageChangeDetails,
  FloatingPanelStageTriggerProps,
  UseFloatingPanelOptions,
  UseFloatingPanelProps,
  UseFloatingPanelReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

class StubResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

const flush = async (fixture: ComponentFixture<unknown>) => {
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

function installDomStubs(): void {
  ;(globalThis as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver
  ;(window as unknown as { ResizeObserver: unknown }).ResizeObserver = StubResizeObserver
}

@Directive({ selector: '[floatingPanelProbe]', standalone: true, exportAs: 'floatingPanelProbe' })
class FloatingPanelProbe {
  private readonly injector = inject(Injector)
  get capturedRoot(): UseFloatingPanelReturn {
    return this.injector.get(ARK_FLOATING_PANEL_CONTEXT)
  }
  get capturedLabelPrefix(): string | null {
    return this.injector.get(LABEL_PREFIX, null)
  }
}

describe('@ark-ui/angular/floating-panel', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    installDomStubs()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_FLOATING_PANEL_CONTEXT).toBe('object')
    expect(typeof ARK_FLOATING_PANEL_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkFloatingPanelContext).toBe('function')
    expect(typeof injectArkFloatingPanelContextCarrier).toBe('function')
    expect(typeof useFloatingPanel).toBe('function')
    expect(typeof floatingPanelAnatomy).toBe('object')
    expect(ArkFloatingPanelRoot).toBeDefined()
    expect(ArkFloatingPanelRootProvider).toBeDefined()
    expect(ArkFloatingPanelTrigger).toBeDefined()
    expect(ArkFloatingPanelPositioner).toBeDefined()
    expect(ArkFloatingPanelContent).toBeDefined()
    expect(ArkFloatingPanelControl).toBeDefined()
    expect(ArkFloatingPanelHeader).toBeDefined()
    expect(ArkFloatingPanelBody).toBeDefined()
    expect(ArkFloatingPanelTitle).toBeDefined()
    expect(ArkFloatingPanelCloseTrigger).toBeDefined()
    expect(ArkFloatingPanelDragTrigger).toBeDefined()
    expect(ArkFloatingPanelResizeTrigger).toBeDefined()
    expect(ArkFloatingPanelStageTrigger).toBeDefined()
    expect(ArkFloatingPanelContext).toBeDefined()
    expect(undefined as FloatingPanelPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useFloatingPanel({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const result = runInInjectionContext(fixture.componentRef.injector, () => useFloatingPanel({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as { id: unknown }).id as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toContain('floating-panel::')

    fixture.destroy()
  })

  it('clicking the trigger toggles the panel open and closed', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFloatingPanelRoot,
        ArkFloatingPanelTrigger,
        ArkFloatingPanelPositioner,
        ArkFloatingPanelContent,
        ArkPortalComponent,
      ],
      template: `
        <div arkFloatingPanel #root="arkFloatingPanel">
          <button type="button" arkFloatingPanelTrigger>Toggle</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkFloatingPanelPositioner>
              <div arkFloatingPanelContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkFloatingPanelRoot)).injector.get(ArkFloatingPanelRoot)
    const trigger = fixture.debugElement.query(By.directive(ArkFloatingPanelTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)
    trigger.click()
    await flush(fixture)
    expect(root.api().open).toBe(true)
    trigger.click()
    await flush(fixture)
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('supports controlled [(open)] with one openChange emission', async () => {
    @Component({
      standalone: true,
      imports: [ArkFloatingPanelRoot, ArkFloatingPanelTrigger],
      template: `
        <div arkFloatingPanel [(open)]="open" (openChange)="emissions.push($event)">
          <button type="button" arkFloatingPanelTrigger>Toggle</button>
        </div>
      `,
    })
    class Host {
      readonly open = signal<boolean | undefined>(false)
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const trigger = fixture.debugElement.query(By.directive(ArkFloatingPanelTrigger)).nativeElement as HTMLButtonElement
    trigger.click()
    await flush(fixture)
    fixture.componentInstance.open.set(true)
    await flush(fixture)

    expect(fixture.componentInstance.open()).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('emits controlled position and size changes from the public API once per changed value', async () => {
    @Component({
      standalone: true,
      imports: [ArkFloatingPanelRoot],
      template: `
        <div
          arkFloatingPanel
          #root="arkFloatingPanel"
          [(position)]="position"
          [(size)]="size"
          (positionChange)="positionEmissions.push($event)"
          (positionDetailsChange)="positionDetails.push($event)"
          (sizeChange)="sizeEmissions.push($event)"
          (sizeDetailsChange)="sizeDetails.push($event)"
        ></div>
      `,
    })
    class Host {
      readonly position = signal<FloatingPanelPoint | undefined>({ x: 10, y: 20 })
      readonly size = signal<FloatingPanelSize | undefined>({ width: 300, height: 200 })
      readonly positionEmissions: Array<FloatingPanelPoint | undefined> = []
      readonly positionDetails: FloatingPanelPositionChangeDetails[] = []
      readonly sizeEmissions: Array<FloatingPanelSize | undefined> = []
      readonly sizeDetails: FloatingPanelSizeChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkFloatingPanelRoot)).injector.get(ArkFloatingPanelRoot)
    root.api().setPosition({ x: 40, y: 60 })
    root.api().setPosition({ x: 40, y: 60 })
    root.api().setSize({ width: 320, height: 240 })
    root.api().setSize({ width: 320, height: 240 })
    await flush(fixture)

    expect(fixture.componentInstance.position()).toEqual({ x: 40, y: 60 })
    expect(fixture.componentInstance.positionEmissions).toEqual([{ x: 40, y: 60 }])
    expect(fixture.componentInstance.positionDetails).toEqual([{ position: { x: 40, y: 60 } }])
    expect(fixture.componentInstance.size()).toEqual({ width: 320, height: 240 })
    expect(fixture.componentInstance.sizeEmissions).toEqual([{ width: 320, height: 240 }])
    expect(fixture.componentInstance.sizeDetails).toEqual([{ size: { width: 320, height: 240 } }])

    fixture.destroy()
  })

  it('drag and resize triggers emit interaction end details', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFloatingPanelRoot,
        ArkFloatingPanelPositioner,
        ArkFloatingPanelContent,
        ArkFloatingPanelDragTrigger,
        ArkFloatingPanelResizeTrigger,
      ],
      template: `
        <div
          #boundary
          arkFloatingPanel
          defaultOpen
          [defaultPosition]="{ x: 100, y: 100 }"
          [defaultSize]="{ width: 200, height: 160 }"
          [getBoundaryEl]="getBoundaryEl"
          (positionChangeEnd)="positionEnds.push($event)"
          (sizeChangeEnd)="sizeEnds.push($event)"
        >
          <div arkFloatingPanelPositioner>
            <div arkFloatingPanelContent>
              <div arkFloatingPanelDragTrigger>Drag</div>
              <div arkFloatingPanelResizeTrigger axis="se"></div>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      boundaryEl: HTMLElement | null = null
      readonly positionEnds: FloatingPanelPositionChangeDetails[] = []
      readonly sizeEnds: FloatingPanelSizeChangeDetails[] = []
      readonly getBoundaryEl = () => this.boundaryEl
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    fixture.componentInstance.boundaryEl = fixture.debugElement.query(By.directive(ArkFloatingPanelRoot))
      .nativeElement as HTMLElement
    vi.spyOn(fixture.componentInstance.boundaryEl, 'getBoundingClientRect').mockReturnValue({
      x: 0,
      y: 0,
      width: 1000,
      height: 1000,
      top: 0,
      right: 1000,
      bottom: 1000,
      left: 0,
      toJSON: () => ({}),
    } as DOMRect)
    await flush(fixture)

    const drag = fixture.debugElement.query(By.directive(ArkFloatingPanelDragTrigger)).nativeElement as HTMLElement
    const resize = fixture.debugElement.query(By.directive(ArkFloatingPanelResizeTrigger)).nativeElement as HTMLElement
    installPointerCaptureMocks(drag)
    installPointerCaptureMocks(resize)

    dispatchPointerEvent(drag, 'pointerdown', { button: 0, clientX: 100, clientY: 100, pointerId: 1 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointermove', { clientX: 125, clientY: 130, pointerId: 1 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointerup', { clientX: 125, clientY: 130, pointerId: 1 })
    await flush(fixture)

    dispatchPointerEvent(resize, 'pointerdown', { button: 0, clientX: 100, clientY: 100, pointerId: 2 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointermove', { clientX: 140, clientY: 150, pointerId: 2 })
    await flush(fixture)
    dispatchPointerEvent(document, 'pointerup', { clientX: 140, clientY: 150, pointerId: 2 })
    await flush(fixture)

    expect(fixture.componentInstance.positionEnds.at(-1)?.position).toEqual({ x: 125, y: 130 })
    expect(fixture.componentInstance.sizeEnds.at(-1)?.size).toEqual({ width: 240, height: 210 })

    fixture.destroy()
  })

  it('clicking the close trigger closes the panel', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFloatingPanelRoot,
        ArkFloatingPanelPositioner,
        ArkFloatingPanelContent,
        ArkFloatingPanelCloseTrigger,
      ],
      template: `
        <div arkFloatingPanel defaultOpen>
          <div arkFloatingPanelPositioner>
            <div arkFloatingPanelContent>
              <button type="button" arkFloatingPanelCloseTrigger>Close</button>
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

    const root = fixture.debugElement.query(By.directive(ArkFloatingPanelRoot)).injector.get(ArkFloatingPanelRoot)
    const close = fixture.debugElement.query(By.directive(ArkFloatingPanelCloseTrigger))
      .nativeElement as HTMLButtonElement
    expect(root.api().open).toBe(true)
    close.click()
    await flush(fixture)
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('clicking a stage trigger emits stageChange details', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFloatingPanelRoot,
        ArkFloatingPanelPositioner,
        ArkFloatingPanelContent,
        ArkFloatingPanelStageTrigger,
      ],
      template: `
        <div arkFloatingPanel defaultOpen (stageChange)="stages.push($event)">
          <div arkFloatingPanelPositioner>
            <div arkFloatingPanelContent>
              <button type="button" arkFloatingPanelStageTrigger stage="maximized">Maximize</button>
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly stages: FloatingPanelStageChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const trigger = fixture.debugElement.query(By.directive(ArkFloatingPanelStageTrigger))
      .nativeElement as HTMLButtonElement
    trigger.click()
    await flush(fixture)

    expect(fixture.componentInstance.stages).toEqual([{ stage: 'maximized' }])

    fixture.destroy()
  })

  it('content rendered through ArkPortalComponent can inject the originating root and host providers', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkFloatingPanelRoot,
        ArkFloatingPanelPositioner,
        ArkFloatingPanelContent,
        ArkPortalComponent,
        FloatingPanelProbe,
      ],
      providers: [{ provide: LABEL_PREFIX, useValue: 'floating-panel-label' }],
      template: `
        <div arkFloatingPanel defaultOpen #root="arkFloatingPanel">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkFloatingPanelPositioner>
              <div arkFloatingPanelContent>
                <span floatingPanelProbe></span>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const root = fixture.debugElement.query(By.directive(ArkFloatingPanelRoot)).injector.get(ArkFloatingPanelRoot)
    const probe = fixture.debugElement.query(By.directive(FloatingPanelProbe)).injector.get(FloatingPanelProbe)
    expect(probe.capturedRoot).toBe(root)
    expect(probe.capturedRoot.api().open).toBe(true)
    expect(probe.capturedLabelPrefix).toBe('floating-panel-label')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkFloatingPanelRoot, ArkFloatingPanelTrigger],
      template: `
        <div arkFloatingPanel>
          <button type="button" arkFloatingPanelTrigger>Toggle</button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({
      imports: [Host],
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    })

    expect(() => {
      const fixture = TestBed.createComponent(Host)
      fixture.detectChanges()
      fixture.destroy()
    }).not.toThrow()
  })

  it('root-provider shares an externally supplied machine with descendants', async () => {
    @Component({
      standalone: true,
      imports: [ArkFloatingPanelRootProvider, ArkFloatingPanelTrigger, FloatingPanelProbe],
      template: `
        <div arkFloatingPanelRootProvider [value]="floatingPanel">
          <button type="button" arkFloatingPanelTrigger>Toggle</button>
          <span floatingPanelProbe></span>
        </div>
      `,
    })
    class Host {
      readonly floatingPanel: UseFloatingPanelReturn = runInInjectionContext(inject(Injector), () =>
        useFloatingPanel({ context: () => ({}) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flush(fixture)

    const trigger = fixture.debugElement.query(By.directive(ArkFloatingPanelTrigger)).nativeElement as HTMLButtonElement
    const provider = fixture.debugElement
      .query(By.directive(ArkFloatingPanelRootProvider))
      .injector.get(ArkFloatingPanelRootProvider)
    const probe = fixture.debugElement.query(By.directive(FloatingPanelProbe)).injector.get(FloatingPanelProbe)

    expect(probe.capturedRoot).toBe(provider)
    expect(provider.api().open).toBe(false)
    trigger.click()
    await flush(fixture)
    expect(provider.api().open).toBe(true)

    fixture.destroy()
  })

  it('example components instantiate', () => {
    TestBed.configureTestingModule({
      imports: [FloatingPanelBasicExample, FloatingPanelLazyMountExample, FloatingPanelRootProviderExample],
    })
    const basic = TestBed.createComponent(FloatingPanelBasicExample)
    basic.detectChanges()
    basic.destroy()
    const lazyMount = TestBed.createComponent(FloatingPanelLazyMountExample)
    lazyMount.detectChanges()
    lazyMount.destroy()
    const rootProvider = TestBed.createComponent(FloatingPanelRootProviderExample)
    rootProvider.detectChanges()
    rootProvider.destroy()
  })
})
