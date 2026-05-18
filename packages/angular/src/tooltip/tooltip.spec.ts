import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ApplicationRef,
  Component,
  Directive,
  Injector,
  InjectionToken,
  PLATFORM_ID,
  inject,
  runInInjectionContext,
  signal,
} from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_TOOLTIP_CONTEXT,
  ARK_TOOLTIP_CONTEXT_CARRIER,
  ArkTooltipArrow,
  ArkTooltipArrowTip,
  ArkTooltipContent,
  ArkTooltipPositioner,
  ArkTooltipRoot,
  ArkTooltipRootProvider,
  ArkTooltipTrigger,
  injectArkTooltipContext,
  tooltipAnatomy,
  useTooltip,
  type TooltipApi,
  type TooltipElementIds,
  type TooltipMachine,
  type TooltipMachineProps,
  type TooltipOpenChangeDetails,
  type TooltipService,
  type UseTooltipOptions,
  type UseTooltipProps,
  type UseTooltipReturn,
} from '@ark-ui/angular/tooltip'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { TooltipBasicExample } from './examples/basic'
import { TooltipControlledExample } from './examples/controlled'
import { TooltipDelayExample } from './examples/delay'
import { TooltipRootProviderExample } from './examples/root-provider'

type TooltipPublicTypeSmoke = [
  TooltipApi,
  TooltipElementIds,
  TooltipMachine,
  TooltipMachineProps,
  TooltipOpenChangeDetails,
  TooltipService,
  UseTooltipOptions,
  UseTooltipProps,
  UseTooltipReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[tooltipProbe]', standalone: true, exportAs: 'tooltipProbe' })
class TooltipProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseTooltipReturn {
    return this._injector.get(ARK_TOOLTIP_CONTEXT)
  }
  get capturedLabelPrefix(): string | null {
    return this._injector.get(LABEL_PREFIX, null)
  }
}

const flushTimers = async (ms = 50) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

describe('@ark-ui/angular/tooltip', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TOOLTIP_CONTEXT).toBe('object')
    expect(typeof ARK_TOOLTIP_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkTooltipContext).toBe('function')
    expect(typeof useTooltip).toBe('function')
    expect(typeof tooltipAnatomy).toBe('object')
    expect(ArkTooltipRoot).toBeDefined()
    expect(ArkTooltipRootProvider).toBeDefined()
    expect(ArkTooltipTrigger).toBeDefined()
    expect(ArkTooltipPositioner).toBeDefined()
    expect(ArkTooltipContent).toBeDefined()
    expect(ArkTooltipArrow).toBeDefined()
    expect(ArkTooltipArrowTip).toBeDefined()
    expect(undefined as TooltipPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useTooltip({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useTooltip({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/tooltip::/)

    fixture.destroy()
  })

  it('descendant probe under [arkTooltip] receives the Root directive via ARK_TOOLTIP_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, TooltipProbe],
      template: '<div arkTooltip><span tooltipProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const probeDebug = fixture.debugElement.query(By.directive(TooltipProbe))
    const rootInstance = rootDebug.injector.get(ArkTooltipRoot)
    const probeInstance = probeDebug.injector.get(TooltipProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkTooltipTrigger] without ancestor [arkTooltip] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipTrigger],
      template: '<button type="button" arkTooltipTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_TOOLTIP_CONTEXT|No provider|NG0201/i)
  })

  it('pointer move on the trigger opens the tooltip and emits (openChange) once', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip [openDelay]="0" [closeDelay]="0" #root="arkTooltip" (openChange)="emissions.push($event)">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkTooltipTrigger)).nativeElement as HTMLElement

    expect(root.api().open).toBe(false)

    triggerEl.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, pointerType: 'mouse' }))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])
    expect('openChange' in root).toBe(false)

    fixture.destroy()
  })

  it('focus on the trigger opens the tooltip', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip [openDelay]="0" [closeDelay]="0" #root="arkTooltip">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkTooltipTrigger)).nativeElement as HTMLElement

    // Tooltip's onFocus handler bails when focus-visible is false; a keyboard event
    // promotes the modality to "keyboard" so the subsequent focus event opens the tooltip.
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
    triggerEl.dispatchEvent(new FocusEvent('focus'))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('pointerleave on the trigger closes an open tooltip after closeDelay', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip [openDelay]="0" [closeDelay]="0" defaultOpen #root="arkTooltip">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkTooltipTrigger)).nativeElement as HTMLElement

    expect(root.api().open).toBe(true)

    triggerEl.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('open trigger has aria-describedby pointing at the content id', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip defaultOpen #root="arkTooltip">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)

    const contentProps = root.api().getContentProps() as Record<string, unknown>
    const contentId = contentProps['id'] as string
    expect(typeof contentId).toBe('string')
    expect(contentId.length).toBeGreaterThan(0)

    const triggerEl = fixture.debugElement.query(By.directive(ArkTooltipTrigger)).nativeElement as HTMLElement
    expect(triggerEl.getAttribute('aria-describedby')).toBe(contentId)

    fixture.destroy()
  })

  it('arrow and arrow-tip parts emit Zag data-scope/data-part attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkTooltipRoot,
        ArkTooltipTrigger,
        ArkTooltipPositioner,
        ArkTooltipContent,
        ArkTooltipArrow,
        ArkTooltipArrowTip,
        ArkPortalComponent,
      ],
      template: `
        <div arkTooltip defaultOpen #root="arkTooltip">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>
                <div arkTooltipArrow>
                  <div arkTooltipArrowTip></div>
                </div>
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
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const arrowEl = fixture.debugElement.query(By.directive(ArkTooltipArrow)).nativeElement as HTMLElement
    const arrowTipEl = fixture.debugElement.query(By.directive(ArkTooltipArrowTip)).nativeElement as HTMLElement

    expect(arrowEl.getAttribute('data-scope')).toBe('tooltip')
    expect(arrowEl.getAttribute('data-part')).toBe('arrow')
    expect(arrowTipEl.getAttribute('data-scope')).toBe('tooltip')
    expect(arrowTipEl.getAttribute('data-part')).toBe('arrow-tip')

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkTooltipRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent, TooltipProbe],
      template: `
        <div arkTooltip defaultOpen #root="arkTooltip">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>
                <span tooltipProbe></span>
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
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const probeDebug = fixture.debugElement.query(By.directive(TooltipProbe))
    const probe = probeDebug.injector.get(TooltipProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkTooltipRoot)).injector.get(ArkTooltipRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('portaled content can inject a host-supplied provider token', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent, TooltipProbe],
      providers: [{ provide: LABEL_PREFIX, useValue: 'tooltip-label' }],
      template: `
        <div arkTooltip defaultOpen #root="arkTooltip">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>
                <span tooltipProbe></span>
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
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const probeDebug = fixture.debugElement.query(By.directive(TooltipProbe))
    const probe = probeDebug.injector.get(TooltipProbe)

    expect(probe.capturedLabelPrefix).toBe('tooltip-label')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipTrigger, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip #root="arkTooltip">
          <button type="button" arkTooltipTrigger>Hover Me</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
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

  it('controlled [(open)] round-trips a host signal and does not re-emit when same value written twice', async () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip #root="arkTooltip" [(open)]="open" (openChange)="emissions.push($event)">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    // Tooltip's toggleVisibility action enqueues controlled.open via queueMicrotask.
    await flushTimers()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    await flushTimers()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('re-applying the same controlled [open] value does not re-call service.send (AC 23)', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip #root="arkTooltip" [open]="open()">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly open = signal<boolean | undefined>(true)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)
    const sendSpy = vi.spyOn(root.service, 'send')

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    const callsAfterFirstReapply = sendSpy.mock.calls.length

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(sendSpy.mock.calls.length).toBe(callsAfterFirstReapply)

    sendSpy.mockRestore()
    fixture.destroy()
  })

  it('[defaultOpen] property binding starts the tooltip open', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip [defaultOpen]="true" #root="arkTooltip">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the tooltip open via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkTooltipRoot, ArkTooltipPositioner, ArkTooltipContent, ArkPortalComponent],
      template: `
        <div arkTooltip defaultOpen #root="arkTooltip">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkTooltipPositioner>
              <div arkTooltipContent>Content</div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkTooltipRoot))
    const root = rootDebug.injector.get(ArkTooltipRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('TooltipBasicExample renders trigger with tooltip data attributes', () => {
    TestBed.configureTestingModule({ imports: [TooltipBasicExample] })
    const fixture = TestBed.createComponent(TooltipBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkTooltipTrigger)).nativeElement as HTMLElement
    expect(triggerEl.getAttribute('data-scope')).toBe('tooltip')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('TooltipControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [TooltipControlledExample] })
    const fixture = TestBed.createComponent(TooltipControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('TooltipDelayExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [TooltipDelayExample] })
    const fixture = TestBed.createComponent(TooltipDelayExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('TooltipRootProviderExample shares state between hook and directives', async () => {
    TestBed.configureTestingModule({ imports: [TooltipRootProviderExample] })
    const fixture = TestBed.createComponent(TooltipRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.tooltip.send({ type: 'open' })
    await flushTimers()
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })
})
