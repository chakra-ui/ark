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
  ARK_DIALOG_CONTEXT,
  ARK_DIALOG_CONTEXT_CARRIER,
  ArkDialogBackdrop,
  ArkDialogCloseTrigger,
  ArkDialogContent,
  ArkDialogDescription,
  ArkDialogPositioner,
  ArkDialogRoot,
  ArkDialogRootProvider,
  ArkDialogTitle,
  ArkDialogTrigger,
  dialogAnatomy,
  injectArkDialogContext,
  useDialog,
  type DialogApi,
  type DialogElementIds,
  type DialogFocusOutsideEvent,
  type DialogInteractOutsideEvent,
  type DialogMachine,
  type DialogMachineProps,
  type DialogOpenChangeDetails,
  type DialogPointerDownOutsideEvent,
  type DialogService,
  type DialogTriggerProps,
  type DialogTriggerValueChangeDetails,
  type UseDialogOptions,
  type UseDialogProps,
  type UseDialogReturn,
} from '@ark-ui/angular/dialog'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { DialogBasicExample } from './examples/basic'
import { DialogConfirmationExample } from './examples/confirmation'
import { DialogContextExample } from './examples/context'
import { DialogControlledExample } from './examples/controlled'
import { DialogDefaultOpenExample } from './examples/default-open'
import { DialogFinalFocusExample } from './examples/final-focus'
import { DialogInitialFocusExample } from './examples/initial-focus'
import { DialogInsideScrollExample } from './examples/inside-scroll'
import { DialogLazyMountExample } from './examples/lazy-mount'
import { DialogMultipleTriggersExample } from './examples/multiple-triggers'
import { DialogNestedExample } from './examples/nested'
import { DialogOpenFromMenuExample } from './examples/open-from-menu'
import { DialogOutsideScrollExample } from './examples/outside-scroll'
import { DialogRapidStateChangeExample } from './examples/rapid-state-change'
import { DialogRootProviderExample } from './examples/root-provider'

type DialogPublicTypeSmoke = [
  DialogApi,
  DialogElementIds,
  DialogFocusOutsideEvent,
  DialogInteractOutsideEvent,
  DialogMachine,
  DialogMachineProps,
  DialogOpenChangeDetails,
  DialogPointerDownOutsideEvent,
  DialogService,
  DialogTriggerProps,
  DialogTriggerValueChangeDetails,
  UseDialogOptions,
  UseDialogProps,
  UseDialogReturn,
]

const LABEL_PREFIX = new InjectionToken<string>('LABEL_PREFIX')

@Directive({ selector: '[dialogProbe]', standalone: true, exportAs: 'dialogProbe' })
class DialogProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseDialogReturn {
    return this._injector.get(ARK_DIALOG_CONTEXT)
  }
  get capturedLabelPrefix(): string | null {
    return this._injector.get(LABEL_PREFIX, null)
  }
}

describe('@ark-ui/angular/dialog', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_DIALOG_CONTEXT).toBe('object')
    expect(typeof ARK_DIALOG_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkDialogContext).toBe('function')
    expect(typeof useDialog).toBe('function')
    expect(typeof dialogAnatomy).toBe('object')
    expect(ArkDialogRoot).toBeDefined()
    expect(ArkDialogRootProvider).toBeDefined()
    expect(ArkDialogTrigger).toBeDefined()
    expect(ArkDialogBackdrop).toBeDefined()
    expect(ArkDialogPositioner).toBeDefined()
    expect(ArkDialogContent).toBeDefined()
    expect(ArkDialogTitle).toBeDefined()
    expect(ArkDialogDescription).toBeDefined()
    expect(ArkDialogCloseTrigger).toBeDefined()
    expect(undefined as DialogPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useDialog({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useDialog({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/dialog::/)

    fixture.destroy()
  })

  it('descendant probe under [arkDialog] receives the Root directive via ARK_DIALOG_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, DialogProbe],
      template: '<div arkDialog><span dialogProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const probeDebug = fixture.debugElement.query(By.directive(DialogProbe))
    const rootInstance = rootDebug.injector.get(ArkDialogRoot)
    const probeInstance = probeDebug.injector.get(DialogProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkDialogTrigger] without ancestor [arkDialog] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogTrigger],
      template: '<button arkDialogTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_DIALOG_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the trigger opens the dialog and emits (openChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog" (openChange)="emissions.push($event)">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDialogTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('clicking the close trigger closes the dialog', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkDialogCloseTrigger, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent>
              <button arkDialogCloseTrigger></button>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDialogTrigger)).nativeElement as HTMLButtonElement

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(true)

    const closeEl = fixture.debugElement.query(By.directive(ArkDialogCloseTrigger))?.nativeElement as HTMLButtonElement
    expect(closeEl).toBeDefined()
    closeEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('Escape key closes an open dialog', async () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog" (escapeKeyDown)="escapeEvents.push($event)">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly escapeEvents: KeyboardEvent[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkDialogTrigger)).nativeElement as HTMLButtonElement

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
    expect(fixture.componentInstance.escapeEvents.length).toBe(1)

    fixture.destroy()
  })

  it('title and description carry ids and the content references them via aria attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkDialogRoot,
        ArkDialogTrigger,
        ArkDialogContent,
        ArkDialogTitle,
        ArkDialogDescription,
        ArkPortalComponent,
      ],
      template: `
        <div arkDialog defaultOpen #root="arkDialog">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent>
              <h2 arkDialogTitle>Title</h2>
              <p arkDialogDescription>Description</p>
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

    const contentEl = fixture.debugElement.query(By.directive(ArkDialogContent)).nativeElement as HTMLElement
    const titleEl = fixture.debugElement.query(By.directive(ArkDialogTitle)).nativeElement as HTMLElement
    const descriptionEl = fixture.debugElement.query(By.directive(ArkDialogDescription)).nativeElement as HTMLElement

    expect(titleEl.id).toBeTruthy()
    expect(descriptionEl.id).toBeTruthy()
    expect(contentEl.getAttribute('aria-labelledby')).toBe(titleEl.id)
    expect(contentEl.getAttribute('aria-describedby')).toBe(descriptionEl.id)

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkDialogRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent, DialogProbe],
      template: `
        <div arkDialog defaultOpen #root="arkDialog">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent>
              <span dialogProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(DialogProbe))
    const probe = probeDebug.injector.get(DialogProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkDialogRoot)).injector.get(ArkDialogRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('portaled content can inject a host-supplied provider token (AC 25)', async () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent, DialogProbe],
      providers: [{ provide: LABEL_PREFIX, useValue: 'dialog-label' }],
      template: `
        <div arkDialog defaultOpen #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent>
              <span dialogProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(DialogProbe))
    const probe = probeDebug.injector.get(DialogProbe)

    expect(probe.capturedLabelPrefix).toBe('dialog-label')

    fixture.destroy()
  })

  it('constructs without throwing under a server platform configuration (AC 26)', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
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
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog" [(open)]="open" (openChange)="emissions.push($event)">
          <button arkDialogTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)

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
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog" [open]="open()">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)
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

  it('[defaultOpen] property binding starts the dialog open', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog [defaultOpen]="true" #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the dialog open via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog defaultOpen #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('role="alertdialog" surfaces on the content props', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog defaultOpen role="alertdialog" #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const contentEl = fixture.debugElement.query(By.directive(ArkDialogContent)).nativeElement as HTMLElement
    expect(contentEl.getAttribute('role')).toBe('alertdialog')

    fixture.destroy()
  })

  it('aria-label input surfaces on content when no title is rendered', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog defaultOpen aria-label="Settings dialog" #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const contentEl = fixture.debugElement.query(By.directive(ArkDialogContent)).nativeElement as HTMLElement
    expect(contentEl.getAttribute('aria-label')).toBe('Settings dialog')

    fixture.destroy()
  })

  it('valued triggers update the triggerValue model', () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogTrigger, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog #root="arkDialog" [(triggerValue)]="triggerValue">
          <button arkDialogTrigger value="first">First</button>
          <button arkDialogTrigger value="second">Second</button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogContent></div>
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

    const triggerEls = fixture.debugElement
      .queryAll(By.directive(ArkDialogTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)

    triggerEls[1]?.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.triggerValue()).toBe('second')

    fixture.destroy()
  })

  it('DialogBasicExample renders trigger with dialog data attributes', () => {
    TestBed.configureTestingModule({ imports: [DialogBasicExample] })
    const fixture = TestBed.createComponent(DialogBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkDialogTrigger)).nativeElement as HTMLButtonElement
    expect(triggerEl.getAttribute('data-scope')).toBe('dialog')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('DialogControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [DialogControlledExample] })
    const fixture = TestBed.createComponent(DialogControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('DialogDefaultOpenExample starts open via the bare defaultOpen attribute', () => {
    TestBed.configureTestingModule({ imports: [DialogDefaultOpenExample] })
    const fixture = TestBed.createComponent(DialogDefaultOpenExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkDialogRoot))
    const root = rootDebug.injector.get(ArkDialogRoot)
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('DialogMultipleTriggersExample tracks the active trigger value', () => {
    TestBed.configureTestingModule({ imports: [DialogMultipleTriggersExample] })
    const fixture = TestBed.createComponent(DialogMultipleTriggersExample)
    fixture.detectChanges()

    const triggerEls = fixture.debugElement
      .queryAll(By.directive(ArkDialogTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)
    triggerEls[0]?.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.activeUser()?.id).toBe('1')

    fixture.destroy()
  })

  it.each([
    [DialogContextExample],
    [DialogInitialFocusExample],
    [DialogFinalFocusExample],
    [DialogLazyMountExample],
    [DialogInsideScrollExample],
    [DialogOutsideScrollExample],
    [DialogNestedExample],
    [DialogConfirmationExample],
    [DialogRapidStateChangeExample],
    [DialogOpenFromMenuExample],
  ])('%s mounts without throwing', (Example) => {
    TestBed.configureTestingModule({ imports: [Example] })
    const fixture = TestBed.createComponent(Example)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('DialogRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [DialogRootProviderExample] })
    const fixture = TestBed.createComponent(DialogRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.dialog.send({ type: 'OPEN' })
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })

  it('[arkDialogBackdrop] applies api().getBackdropProps() with data-scope and data-part', async () => {
    @Component({
      standalone: true,
      imports: [ArkDialogRoot, ArkDialogBackdrop, ArkDialogPositioner, ArkDialogContent, ArkPortalComponent],
      template: `
        <div arkDialog defaultOpen #root="arkDialog">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkDialogBackdrop></div>
            <div arkDialogPositioner>
              <div arkDialogContent></div>
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

    const backdropEl = fixture.debugElement.query(By.directive(ArkDialogBackdrop)).nativeElement as HTMLElement
    expect(backdropEl.getAttribute('data-scope')).toBe('dialog')
    expect(backdropEl.getAttribute('data-part')).toBe('backdrop')

    const positionerEl = fixture.debugElement.query(By.directive(ArkDialogPositioner)).nativeElement as HTMLElement
    expect(positionerEl.getAttribute('data-scope')).toBe('dialog')
    expect(positionerEl.getAttribute('data-part')).toBe('positioner')

    fixture.destroy()
  })
})
