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
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_DRAWER_CONTEXT,
  ARK_DRAWER_CONTEXT_CARRIER,
  ARK_DRAWER_STACK_CONTEXT,
  ArkDrawerBackdrop,
  ArkDrawerCloseTrigger,
  ArkDrawerContent,
  ArkDrawerDescription,
  ArkDrawerGrabber,
  ArkDrawerGrabberIndicator,
  ArkDrawerIndent,
  ArkDrawerIndentBackground,
  ArkDrawerPositioner,
  ArkDrawerRoot,
  ArkDrawerRootProvider,
  ArkDrawerStack,
  ArkDrawerSwipeArea,
  ArkDrawerTitle,
  ArkDrawerTrigger,
  drawerAnatomy,
  injectArkDrawerContext,
  injectArkDrawerContextCarrier,
  useDrawer,
  type DrawerApi,
  type DrawerResolvedSnapPoint,
  type DrawerElementIds,
  type DrawerMachine,
  type DrawerMachineProps,
  type DrawerOpenChangeDetails,
  type DrawerService,
  type DrawerStackApi,
  type DrawerStackSnapshot,
  type UseDrawerOptions,
  type UseDrawerProps,
  type UseDrawerReturn,
} from '@ark-ui/angular/drawer'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { DrawerBasicExample } from './examples/basic'
import { DrawerControlledExample } from './examples/controlled'
import { DrawerDefaultOpenExample } from './examples/default-open'
import { DrawerRootProviderExample } from './examples/root-provider'

type DrawerPublicTypeSmoke = [
  DrawerApi,
  DrawerElementIds,
  DrawerMachine,
  DrawerMachineProps,
  DrawerOpenChangeDetails,
  DrawerResolvedSnapPoint,
  DrawerService,
  DrawerStackApi,
  DrawerStackSnapshot,
  UseDrawerOptions,
  UseDrawerProps,
  UseDrawerReturn,
]

@Directive({ selector: '[drawerProbe]', standalone: true, exportAs: 'drawerProbe' })
class DrawerProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseDrawerReturn {
    return this._injector.get(ARK_DRAWER_CONTEXT)
  }
}

describe('@ark-ui/angular/drawer', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_DRAWER_CONTEXT).toBe('object')
    expect(typeof ARK_DRAWER_CONTEXT_CARRIER).toBe('object')
    expect(typeof ARK_DRAWER_STACK_CONTEXT).toBe('object')
    expect(typeof injectArkDrawerContext).toBe('function')
    expect(typeof injectArkDrawerContextCarrier).toBe('function')
    expect(typeof useDrawer).toBe('function')
    expect(typeof drawerAnatomy).toBe('object')
    expect(ArkDrawerRoot).toBeDefined()
    expect(ArkDrawerRootProvider).toBeDefined()
    expect(ArkDrawerTrigger).toBeDefined()
    expect(ArkDrawerBackdrop).toBeDefined()
    expect(ArkDrawerPositioner).toBeDefined()
    expect(ArkDrawerContent).toBeDefined()
    expect(ArkDrawerTitle).toBeDefined()
    expect(ArkDrawerDescription).toBeDefined()
    expect(ArkDrawerCloseTrigger).toBeDefined()
    expect(ArkDrawerGrabber).toBeDefined()
    expect(ArkDrawerGrabberIndicator).toBeDefined()
    expect(ArkDrawerSwipeArea).toBeDefined()
    expect(ArkDrawerIndent).toBeDefined()
    expect(ArkDrawerIndentBackground).toBeDefined()
    expect(ArkDrawerStack).toBeDefined()
    expect(undefined as DrawerPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useDrawer({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useDrawer({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/drawer::/)

    fixture.destroy()
  })

  it('descendant probe under [arkDrawer] receives the Root directive via ARK_DRAWER_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, DrawerProbe],
      template: '<div arkDrawer><span drawerProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const probeDebug = fixture.debugElement.query(By.directive(DrawerProbe))
    const rootInstance = rootDebug.injector.get(ArkDrawerRoot)
    const probeInstance = probeDebug.injector.get(DrawerProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkDrawerTrigger] without ancestor [arkDrawer] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerTrigger],
      template: '<button arkDrawerTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_DRAWER_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the trigger opens the drawer and emits (openChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer" (openChange)="emissions.push($event)">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDrawerTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('clicking the close trigger closes the drawer', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkDrawerCloseTrigger, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent>
              <button arkDrawerCloseTrigger></button>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDrawerTrigger)).nativeElement as HTMLButtonElement

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(true)

    const closeEl = fixture.debugElement.query(By.directive(ArkDrawerCloseTrigger))?.nativeElement as HTMLButtonElement
    expect(closeEl).toBeDefined()
    closeEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('Escape key closes an open drawer', async () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDrawerTrigger)).nativeElement as HTMLButtonElement

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true, cancelable: true }),
    )
    await TestBed.inject(ApplicationRef).whenStable()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('drawer-specific parts apply scoped data attributes (grabber, grabber-indicator, swipe-area)', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDrawerRoot,
        ArkDrawerContent,
        ArkDrawerGrabber,
        ArkDrawerGrabberIndicator,
        ArkDrawerSwipeArea,
        ArkDrawerPositioner,
        ArkPortalComponent,
      ],
      template: `
        <div arkDrawer defaultOpen #root="arkDrawer">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerPositioner>
              <div arkDrawerContent>
                <div arkDrawerGrabber>
                  <span arkDrawerGrabberIndicator></span>
                </div>
                <div arkDrawerSwipeArea></div>
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

    const grabberEl = fixture.debugElement.query(By.directive(ArkDrawerGrabber)).nativeElement as HTMLElement
    expect(grabberEl.getAttribute('data-scope')).toBe('drawer')
    expect(grabberEl.getAttribute('data-part')).toBe('grabber')

    const grabberIndicatorEl = fixture.debugElement.query(By.directive(ArkDrawerGrabberIndicator))
      .nativeElement as HTMLElement
    expect(grabberIndicatorEl.getAttribute('data-scope')).toBe('drawer')
    expect(grabberIndicatorEl.getAttribute('data-part')).toBe('grabber-indicator')

    const swipeAreaEl = fixture.debugElement.query(By.directive(ArkDrawerSwipeArea)).nativeElement as HTMLElement
    expect(swipeAreaEl.getAttribute('data-scope')).toBe('drawer')
    expect(swipeAreaEl.getAttribute('data-part')).toBe('swipe-area')

    fixture.destroy()
  })

  it('drawer stack helper exposes indent + indent-background with stack data attributes', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerStack, ArkDrawerIndent, ArkDrawerIndentBackground],
      template: `
        <ark-drawer-stack>
          <div arkDrawerIndent></div>
          <div arkDrawerIndentBackground></div>
        </ark-drawer-stack>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indentEl = fixture.debugElement.query(By.directive(ArkDrawerIndent)).nativeElement as HTMLElement
    expect(indentEl.getAttribute('data-inactive')).toBe('')

    const indentBackgroundEl = fixture.debugElement.query(By.directive(ArkDrawerIndentBackground))
      .nativeElement as HTMLElement
    expect(indentBackgroundEl.getAttribute('data-inactive')).toBe('')

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkDrawerRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkPortalComponent, DrawerProbe],
      template: `
        <div arkDrawer defaultOpen #root="arkDrawer">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent>
              <span drawerProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(DrawerProbe))
    const probe = probeDebug.injector.get(DrawerProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkDrawerRoot)).injector.get(ArkDrawerRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
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
      imports: [ArkDrawerRoot, ArkDrawerTrigger, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer" [(open)]="open" (openChange)="emissions.push($event)">
          <button arkDrawerTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)

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
      imports: [ArkDrawerRoot, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer #root="arkDrawer" [open]="open()">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)
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

  it('[defaultOpen] property binding starts the drawer open', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer [defaultOpen]="true" #root="arkDrawer">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the drawer open via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer defaultOpen #root="arkDrawer">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('DrawerBasicExample renders trigger with drawer data attributes', () => {
    TestBed.configureTestingModule({ imports: [DrawerBasicExample] })
    const fixture = TestBed.createComponent(DrawerBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkDrawerTrigger)).nativeElement as HTMLButtonElement
    expect(triggerEl.getAttribute('data-scope')).toBe('drawer')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('DrawerControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [DrawerControlledExample] })
    const fixture = TestBed.createComponent(DrawerControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('DrawerDefaultOpenExample starts open via the bare defaultOpen attribute', () => {
    TestBed.configureTestingModule({ imports: [DrawerDefaultOpenExample] })
    const fixture = TestBed.createComponent(DrawerDefaultOpenExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDrawerRoot))
    const root = rootDebug.injector.get(ArkDrawerRoot)
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('DrawerRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [DrawerRootProviderExample] })
    const fixture = TestBed.createComponent(DrawerRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.drawer.send({ type: 'OPEN' })
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })

  it('[arkDrawerBackdrop] and [arkDrawerPositioner] apply Zag props with data-scope and data-part', async () => {
    @Component({
      standalone: true,
      imports: [ArkDrawerRoot, ArkDrawerBackdrop, ArkDrawerPositioner, ArkDrawerContent, ArkPortalComponent],
      template: `
        <div arkDrawer defaultOpen #root="arkDrawer">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDrawerBackdrop></div>
            <div arkDrawerPositioner>
              <div arkDrawerContent></div>
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

    const backdropEl = fixture.debugElement.query(By.directive(ArkDrawerBackdrop)).nativeElement as HTMLElement
    expect(backdropEl.getAttribute('data-scope')).toBe('drawer')
    expect(backdropEl.getAttribute('data-part')).toBe('backdrop')

    const positionerEl = fixture.debugElement.query(By.directive(ArkDrawerPositioner)).nativeElement as HTMLElement
    expect(positionerEl.getAttribute('data-scope')).toBe('drawer')
    expect(positionerEl.getAttribute('data-part')).toBe('positioner')

    fixture.destroy()
  })
})
