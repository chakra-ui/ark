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
  ARK_POPOVER_CONTEXT,
  ARK_POPOVER_CONTEXT_CARRIER,
  ArkPopoverAnchor,
  ArkPopoverArrow,
  ArkPopoverArrowTip,
  ArkPopoverCloseTrigger,
  ArkPopoverContent,
  ArkPopoverDescription,
  ArkPopoverIndicator,
  ArkPopoverPositioner,
  ArkPopoverRoot,
  ArkPopoverRootProvider,
  ArkPopoverTitle,
  ArkPopoverTrigger,
  injectArkPopoverContext,
  injectArkPopoverContextCarrier,
  popoverAnatomy,
  usePopover,
  type PopoverApi,
  type PopoverElementIds,
  type PopoverFocusOutsideEvent,
  type PopoverInteractOutsideEvent,
  type PopoverIntlTranslations,
  type PopoverMachine,
  type PopoverMachineProps,
  type PopoverOpenChangeDetails,
  type PopoverPointerDownOutsideEvent,
  type PopoverPlacement,
  type PopoverPositioningOptions,
  type PopoverService,
  type PopoverTriggerMachineProps,
  type PopoverTriggerProps,
  type PopoverTriggerValueChangeDetails,
  type UsePopoverOptions,
  type UsePopoverProps,
  type UsePopoverReturn,
} from '@ark-ui/angular/popover'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { PopoverBasicExample } from './examples/basic'
import { PopoverCloseBehaviorExample } from './examples/close-behavior'
import { PopoverContextExample } from './examples/context'
import { PopoverControlledExample } from './examples/controlled'
import { PopoverDefaultOpenExample } from './examples/default-open'
import { PopoverDisableOutsideClickExample } from './examples/disable-outside-click'
import { PopoverInitialFocusExample } from './examples/initial-focus'
import { PopoverLazyMountExample } from './examples/lazy-mount'
import { PopoverMultipleTriggersExample } from './examples/multiple-triggers'
import { PopoverNestedExample } from './examples/nested'
import { PopoverPositioningExample } from './examples/positioning'
import { PopoverRootProviderExample } from './examples/root-provider'
import { PopoverSameWidthExample } from './examples/same-width'

type PopoverPublicTypeSmoke = [
  PopoverApi,
  PopoverElementIds,
  PopoverFocusOutsideEvent,
  PopoverInteractOutsideEvent,
  PopoverIntlTranslations,
  PopoverMachine,
  PopoverMachineProps,
  PopoverOpenChangeDetails,
  PopoverPointerDownOutsideEvent,
  PopoverPlacement,
  PopoverPositioningOptions,
  PopoverService,
  PopoverTriggerMachineProps,
  PopoverTriggerProps,
  PopoverTriggerValueChangeDetails,
  UsePopoverOptions,
  UsePopoverProps,
  UsePopoverReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[popoverProbe]', standalone: true, exportAs: 'popoverProbe' })
class PopoverProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UsePopoverReturn {
    return this._injector.get(ARK_POPOVER_CONTEXT)
  }
  get capturedLabelPrefix(): string | null {
    return this._injector.get(LABEL_PREFIX, null)
  }
}

describe('@ark-ui/angular/popover', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_POPOVER_CONTEXT).toBe('object')
    expect(typeof ARK_POPOVER_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkPopoverContext).toBe('function')
    expect(typeof injectArkPopoverContextCarrier).toBe('function')
    expect(typeof usePopover).toBe('function')
    expect(typeof popoverAnatomy).toBe('object')
    expect(ArkPopoverRoot).toBeDefined()
    expect(ArkPopoverRootProvider).toBeDefined()
    expect(ArkPopoverTrigger).toBeDefined()
    expect(ArkPopoverAnchor).toBeDefined()
    expect(ArkPopoverPositioner).toBeDefined()
    expect(ArkPopoverContent).toBeDefined()
    expect(ArkPopoverTitle).toBeDefined()
    expect(ArkPopoverDescription).toBeDefined()
    expect(ArkPopoverCloseTrigger).toBeDefined()
    expect(ArkPopoverIndicator).toBeDefined()
    expect(ArkPopoverArrow).toBeDefined()
    expect(ArkPopoverArrowTip).toBeDefined()
    expect(undefined as PopoverPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('usePopover({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => usePopover({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/popover::/)

    fixture.destroy()
  })

  it('descendant probe under [arkPopover] receives the Root directive via ARK_POPOVER_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, PopoverProbe],
      template: '<div arkPopover><span popoverProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const probeDebug = fixture.debugElement.query(By.directive(PopoverProbe))
    const rootInstance = rootDebug.injector.get(ArkPopoverRoot)
    const probeInstance = probeDebug.injector.get(PopoverProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkPopoverTrigger] without ancestor [arkPopover] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverTrigger],
      template: '<button arkPopoverTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_POPOVER_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the trigger opens the popover and emits (openChange) exactly once', async () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverTrigger, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover #root="arkPopover" (openChange)="emissions.push($event)">
          <button arkPopoverTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkPopoverTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)

    triggerEl.click()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('clicking the close trigger closes the popover', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPopoverRoot,
        ArkPopoverTrigger,
        ArkPopoverPositioner,
        ArkPopoverContent,
        ArkPopoverCloseTrigger,
        ArkPortalComponent,
      ],
      template: `
        <div arkPopover #root="arkPopover">
          <button arkPopoverTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent>
                <button arkPopoverCloseTrigger></button>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkPopoverTrigger)).nativeElement as HTMLButtonElement

    triggerEl.click()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)

    const closeEl = fixture.debugElement.query(By.directive(ArkPopoverCloseTrigger))?.nativeElement as HTMLButtonElement
    expect(closeEl).toBeDefined()
    closeEl.click()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('arrow, arrow-tip, and indicator parts emit Zag data-scope/data-part attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPopoverRoot,
        ArkPopoverTrigger,
        ArkPopoverIndicator,
        ArkPopoverPositioner,
        ArkPopoverContent,
        ArkPopoverArrow,
        ArkPopoverArrowTip,
        ArkPortalComponent,
      ],
      template: `
        <div arkPopover defaultOpen #root="arkPopover">
          <button arkPopoverTrigger>
            <span arkPopoverIndicator></span>
          </button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent>
                <div arkPopoverArrow>
                  <div arkPopoverArrowTip></div>
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

    const arrowEl = fixture.debugElement.query(By.directive(ArkPopoverArrow)).nativeElement as HTMLElement
    const arrowTipEl = fixture.debugElement.query(By.directive(ArkPopoverArrowTip)).nativeElement as HTMLElement
    const indicatorEl = fixture.debugElement.query(By.directive(ArkPopoverIndicator)).nativeElement as HTMLElement

    expect(arrowEl.getAttribute('data-scope')).toBe('popover')
    expect(arrowEl.getAttribute('data-part')).toBe('arrow')
    expect(arrowTipEl.getAttribute('data-scope')).toBe('popover')
    expect(arrowTipEl.getAttribute('data-part')).toBe('arrow-tip')
    expect(indicatorEl.getAttribute('data-scope')).toBe('popover')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkPopoverRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent, PopoverProbe],
      template: `
        <div arkPopover defaultOpen #root="arkPopover">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent>
                <span popoverProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(PopoverProbe))
    const probe = probeDebug.injector.get(PopoverProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkPopoverRoot)).injector.get(ArkPopoverRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('portaled content can inject a host-supplied provider token (AC 25 parity)', async () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent, PopoverProbe],
      providers: [{ provide: LABEL_PREFIX, useValue: 'popover-label' }],
      template: `
        <div arkPopover defaultOpen #root="arkPopover">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent>
                <span popoverProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(PopoverProbe))
    const probe = probeDebug.injector.get(PopoverProbe)

    expect(probe.capturedLabelPrefix).toBe('popover-label')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration (AC 26)', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverTrigger, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover #root="arkPopover">
          <button arkPopoverTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
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

  it('controlled [(open)] round-trips a host signal and does not re-emit when same value written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover #root="arkPopover" [(open)]="open" (openChange)="emissions.push($event)">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('re-applying the same controlled [open] value does not re-call service.send (AC 23)', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover #root="arkPopover" [open]="open()">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)
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

  it('[defaultOpen] property binding starts the popover open', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover [defaultOpen]="true" #root="arkPopover">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the popover open via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover defaultOpen #root="arkPopover">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('[arkPopoverTrigger] forwards value into the trigger value model', async () => {
    @Component({
      standalone: true,
      imports: [ArkPopoverRoot, ArkPopoverTrigger, ArkPopoverPositioner, ArkPopoverContent, ArkPortalComponent],
      template: `
        <div arkPopover #root="arkPopover" [(triggerValue)]="triggerValue">
          <button arkPopoverTrigger value="share">Share</button>
          <button arkPopoverTrigger value="export">Export</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkPopoverPositioner>
              <div arkPopoverContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly triggerValue = signal<string | null | undefined>(undefined)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const triggers = fixture.debugElement.queryAll(By.directive(ArkPopoverTrigger))
    ;(triggers[1].nativeElement as HTMLButtonElement).click()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.triggerValue()).toBe('export')

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('PopoverBasicExample renders trigger with popover data attributes', () => {
    TestBed.configureTestingModule({ imports: [PopoverBasicExample] })
    const fixture = TestBed.createComponent(PopoverBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkPopoverTrigger)).nativeElement as HTMLButtonElement
    expect(triggerEl.getAttribute('data-scope')).toBe('popover')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('PopoverControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [PopoverControlledExample] })
    const fixture = TestBed.createComponent(PopoverControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('PopoverDefaultOpenExample starts open via the bare defaultOpen attribute', () => {
    TestBed.configureTestingModule({ imports: [PopoverDefaultOpenExample] })
    const fixture = TestBed.createComponent(PopoverDefaultOpenExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkPopoverRoot))
    const root = rootDebug.injector.get(ArkPopoverRoot)
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('PopoverRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [PopoverRootProviderExample] })
    const fixture = TestBed.createComponent(PopoverRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.popover.send({ type: 'OPEN' })
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })

  it('new parity examples mount without throwing', () => {
    const examples = [
      PopoverCloseBehaviorExample,
      PopoverContextExample,
      PopoverDisableOutsideClickExample,
      PopoverInitialFocusExample,
      PopoverLazyMountExample,
      PopoverMultipleTriggersExample,
      PopoverNestedExample,
      PopoverPositioningExample,
      PopoverSameWidthExample,
    ]

    for (const example of examples) {
      TestBed.resetTestingModule()
      TestBed.configureTestingModule({ imports: [example] })
      const fixture = TestBed.createComponent(example)
      fixture.detectChanges()
      fixture.destroy()
    }
  })
})
