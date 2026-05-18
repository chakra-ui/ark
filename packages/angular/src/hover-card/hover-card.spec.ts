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
  ARK_HOVER_CARD_CONTEXT,
  ARK_HOVER_CARD_CONTEXT_CARRIER,
  ArkHoverCardArrow,
  ArkHoverCardArrowTip,
  ArkHoverCardContent,
  ArkHoverCardPositioner,
  ArkHoverCardRoot,
  ArkHoverCardRootProvider,
  ArkHoverCardTrigger,
  hoverCardAnatomy,
  injectArkHoverCardContext,
  injectArkHoverCardContextCarrier,
  useHoverCard,
  type HoverCardApi,
  type HoverCardElementIds,
  type HoverCardMachine,
  type HoverCardMachineProps,
  type HoverCardOpenChangeDetails,
  type HoverCardPlacement,
  type HoverCardPositioningOptions,
  type HoverCardService,
  type HoverCardTriggerMachineProps,
  type HoverCardTriggerValueChangeDetails,
  type UseHoverCardOptions,
  type UseHoverCardProps,
  type UseHoverCardReturn,
} from '@ark-ui/angular/hover-card'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { HoverCardBasicExample } from './examples/basic'
import { HoverCardControlledExample } from './examples/controlled'
import { HoverCardDelayExample } from './examples/delay'
import { HoverCardRootProviderExample } from './examples/root-provider'

type HoverCardPublicTypeSmoke = [
  HoverCardApi,
  HoverCardElementIds,
  HoverCardMachine,
  HoverCardMachineProps,
  HoverCardOpenChangeDetails,
  HoverCardPlacement,
  HoverCardPositioningOptions,
  HoverCardService,
  HoverCardTriggerMachineProps,
  HoverCardTriggerValueChangeDetails,
  UseHoverCardOptions,
  UseHoverCardProps,
  UseHoverCardReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[hoverCardProbe]', standalone: true, exportAs: 'hoverCardProbe' })
class HoverCardProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseHoverCardReturn {
    return this._injector.get(ARK_HOVER_CARD_CONTEXT)
  }
  get capturedLabelPrefix(): string | null {
    return this._injector.get(LABEL_PREFIX, null)
  }
}

const flushTimers = async (ms = 50) => {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

describe('@ark-ui/angular/hover-card', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_HOVER_CARD_CONTEXT).toBe('object')
    expect(typeof ARK_HOVER_CARD_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkHoverCardContext).toBe('function')
    expect(typeof injectArkHoverCardContextCarrier).toBe('function')
    expect(typeof useHoverCard).toBe('function')
    expect(typeof hoverCardAnatomy).toBe('object')
    expect(ArkHoverCardRoot).toBeDefined()
    expect(ArkHoverCardRootProvider).toBeDefined()
    expect(ArkHoverCardTrigger).toBeDefined()
    expect(ArkHoverCardPositioner).toBeDefined()
    expect(ArkHoverCardContent).toBeDefined()
    expect(ArkHoverCardArrow).toBeDefined()
    expect(ArkHoverCardArrowTip).toBeDefined()
    expect(undefined as HoverCardPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useHoverCard({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useHoverCard({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/hover-card::/)

    fixture.destroy()
  })

  it('descendant probe under [arkHoverCard] receives the Root directive via ARK_HOVER_CARD_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, HoverCardProbe],
      template: '<div arkHoverCard><span hoverCardProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const probeDebug = fixture.debugElement.query(By.directive(HoverCardProbe))
    const rootInstance = rootDebug.injector.get(ArkHoverCardRoot)
    const probeInstance = probeDebug.injector.get(HoverCardProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkHoverCardTrigger] without ancestor [arkHoverCard] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardTrigger],
      template: '<a arkHoverCardTrigger></a>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_HOVER_CARD_CONTEXT|No provider|NG0201/i)
  })

  it('pointerenter on the trigger opens the hover card after openDelay and emits (openChange) once', async () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardTrigger, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard [openDelay]="0" [closeDelay]="0" #root="arkHoverCard" (openChange)="emissions.push($event)">
          <a arkHoverCardTrigger href="#"></a>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkHoverCardTrigger)).nativeElement as HTMLElement

    expect(root.api().open).toBe(false)

    triggerEl.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('focus on the trigger opens the hover card', async () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardTrigger, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard [openDelay]="0" [closeDelay]="0" #root="arkHoverCard">
          <a arkHoverCardTrigger href="#"></a>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkHoverCardTrigger)).nativeElement as HTMLElement

    triggerEl.dispatchEvent(new FocusEvent('focus'))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('pointerleave on the trigger closes an open hover card after closeDelay', async () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardTrigger, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard [openDelay]="0" [closeDelay]="0" defaultOpen #root="arkHoverCard">
          <a arkHoverCardTrigger href="#"></a>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkHoverCardTrigger)).nativeElement as HTMLElement

    expect(root.api().open).toBe(true)

    triggerEl.dispatchEvent(new PointerEvent('pointerleave', { bubbles: true, pointerType: 'mouse' }))
    await flushTimers()
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('arrow and arrow-tip parts emit Zag data-scope/data-part attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkHoverCardRoot,
        ArkHoverCardTrigger,
        ArkHoverCardPositioner,
        ArkHoverCardContent,
        ArkHoverCardArrow,
        ArkHoverCardArrowTip,
        ArkPortalComponent,
      ],
      template: `
        <div arkHoverCard defaultOpen #root="arkHoverCard">
          <a arkHoverCardTrigger href="#"></a>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent>
                <div arkHoverCardArrow>
                  <div arkHoverCardArrowTip></div>
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

    const arrowEl = fixture.debugElement.query(By.directive(ArkHoverCardArrow)).nativeElement as HTMLElement
    const arrowTipEl = fixture.debugElement.query(By.directive(ArkHoverCardArrowTip)).nativeElement as HTMLElement

    expect(arrowEl.getAttribute('data-scope')).toBe('hover-card')
    expect(arrowEl.getAttribute('data-part')).toBe('arrow')
    expect(arrowTipEl.getAttribute('data-scope')).toBe('hover-card')
    expect(arrowTipEl.getAttribute('data-part')).toBe('arrow-tip')

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkHoverCardRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent, HoverCardProbe],
      template: `
        <div arkHoverCard defaultOpen #root="arkHoverCard">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent>
                <span hoverCardProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(HoverCardProbe))
    const probe = probeDebug.injector.get(HoverCardProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkHoverCardRoot)).injector.get(ArkHoverCardRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('portaled content can inject a host-supplied provider token', async () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent, HoverCardProbe],
      providers: [{ provide: LABEL_PREFIX, useValue: 'hover-card-label' }],
      template: `
        <div arkHoverCard defaultOpen #root="arkHoverCard">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent>
                <span hoverCardProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(HoverCardProbe))
    const probe = probeDebug.injector.get(HoverCardProbe)

    expect(probe.capturedLabelPrefix).toBe('hover-card-label')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardTrigger, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard #root="arkHoverCard">
          <a arkHoverCardTrigger href="#"></a>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard #root="arkHoverCard" [(open)]="open" (openChange)="emissions.push($event)">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('re-applying the same controlled [open] value does not re-call service.send (AC 23)', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard #root="arkHoverCard" [open]="open()">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)
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

  it('[defaultOpen] property binding starts the hover card open', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard [defaultOpen]="true" #root="arkHoverCard">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('[defaultOpen] is initial-only for uncontrolled hover cards', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard [defaultOpen]="defaultOpen()" #root="arkHoverCard">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly defaultOpen = signal(false)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)

    expect(root.api().open).toBe(false)

    fixture.componentInstance.defaultOpen.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the hover card open via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkHoverCardRoot, ArkHoverCardPositioner, ArkHoverCardContent, ArkPortalComponent],
      template: `
        <div arkHoverCard defaultOpen #root="arkHoverCard">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkHoverCardPositioner>
              <div arkHoverCardContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkHoverCardRoot))
    const root = rootDebug.injector.get(ArkHoverCardRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('HoverCardBasicExample renders trigger with hover-card data attributes', () => {
    TestBed.configureTestingModule({ imports: [HoverCardBasicExample] })
    const fixture = TestBed.createComponent(HoverCardBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkHoverCardTrigger)).nativeElement as HTMLElement
    expect(triggerEl.getAttribute('data-scope')).toBe('hover-card')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('HoverCardControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [HoverCardControlledExample] })
    const fixture = TestBed.createComponent(HoverCardControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('HoverCardDelayExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [HoverCardDelayExample] })
    const fixture = TestBed.createComponent(HoverCardDelayExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('HoverCardRootProviderExample shares state between hook and directives', async () => {
    TestBed.configureTestingModule({ imports: [HoverCardRootProviderExample] })
    const fixture = TestBed.createComponent(HoverCardRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.hoverCard.send({ type: 'OPEN' })
    await new Promise((resolve) => setTimeout(resolve, 700))
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })
})
