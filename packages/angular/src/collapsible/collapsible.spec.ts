import { Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_COLLAPSIBLE_CONTEXT,
  ArkCollapsibleContent,
  ArkCollapsibleIndicator,
  ArkCollapsibleRoot,
  ArkCollapsibleRootProvider,
  ArkCollapsibleTrigger,
  collapsibleAnatomy,
  injectArkCollapsibleContext,
  useCollapsible,
  type CollapsibleApi,
  type CollapsibleElementIds,
  type CollapsibleMachine,
  type CollapsibleMachineProps,
  type CollapsibleOpenChangeDetails,
  type CollapsibleService,
  type UseCollapsibleOptions,
  type UseCollapsibleProps,
  type UseCollapsibleReturn,
} from '@ark-ui/angular/collapsible'
import { CollapsibleBasicExample } from './examples/basic'
import { CollapsibleDisabledExample } from './examples/disabled'
import { CollapsibleInitialOpenExample } from './examples/initial-open'
import { CollapsibleLazyMountExample } from './examples/lazy-mount'
import { CollapsibleNestedExample } from './examples/nested'
import { CollapsibleRootProviderExample } from './examples/root-provider'

type CollapsiblePublicTypeSmoke = [
  CollapsibleApi,
  CollapsibleElementIds,
  CollapsibleMachine,
  CollapsibleMachineProps,
  CollapsibleOpenChangeDetails,
  CollapsibleService,
  UseCollapsibleOptions,
  UseCollapsibleProps,
  UseCollapsibleReturn,
]

@Directive({ selector: '[collapsibleProbe]', standalone: true, exportAs: 'collapsibleProbe' })
class CollapsibleProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseCollapsibleReturn {
    return this._injector.get(ARK_COLLAPSIBLE_CONTEXT)
  }
}

describe('@ark-ui/angular/collapsible', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_COLLAPSIBLE_CONTEXT).toBe('object')
    expect(typeof injectArkCollapsibleContext).toBe('function')
    expect(typeof useCollapsible).toBe('function')
    expect(typeof collapsibleAnatomy).toBe('object')
    expect(ArkCollapsibleRoot).toBeDefined()
    expect(ArkCollapsibleRootProvider).toBeDefined()
    expect(ArkCollapsibleTrigger).toBeDefined()
    expect(ArkCollapsibleContent).toBeDefined()
    expect(ArkCollapsibleIndicator).toBeDefined()
    expect(undefined as CollapsiblePublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useCollapsible({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useCollapsible({ context: () => ({}) }))
    const id = (result.api().getRootProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/collapsible::/)

    fixture.destroy()
  })

  it('descendant probe under [arkCollapsible] receives the Root directive via ARK_COLLAPSIBLE_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, CollapsibleProbe],
      template: '<div arkCollapsible><span collapsibleProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const probeDebug = fixture.debugElement.query(By.directive(CollapsibleProbe))
    const rootInstance = rootDebug.injector.get(ArkCollapsibleRoot)
    const probeInstance = probeDebug.injector.get(CollapsibleProbe)

    expect(probeInstance.captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkCollapsibleTrigger] without ancestor [arkCollapsible] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleTrigger],
      template: '<button arkCollapsibleTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_COLLAPSIBLE_CONTEXT|No provider|NG0201/i)
  })

  it('orphan [arkCollapsibleContent] without ancestor [arkCollapsible] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleContent],
      template: '<div arkCollapsibleContent></div>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_COLLAPSIBLE_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the trigger flips api().open, updates data-state, and emits (openChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger, ArkCollapsibleContent],
      template: `
        <div arkCollapsible (openChange)="emissions.push($event)">
          <button arkCollapsibleTrigger></button>
          <div arkCollapsibleContent></div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    const contentEl = fixture.debugElement.query(By.directive(ArkCollapsibleContent)).nativeElement as HTMLElement

    expect(root.api().open).toBe(false)
    expect(triggerEl.getAttribute('data-state')).toBe('closed')
    expect(contentEl.getAttribute('data-state')).toBe('closed')

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(true)
    expect(triggerEl.getAttribute('data-state')).toBe('open')
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('native trigger activation toggles open from keyboard-generated clicks', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: '<div arkCollapsible><button arkCollapsibleTrigger></button></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)

    triggerEl.focus()
    triggerEl.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(true)

    triggerEl.dispatchEvent(new MouseEvent('click', { bubbles: true, detail: 0 }))
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('controlled [(open)] round-trips a host signal and does not re-emit when same value written twice', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: `
        <div arkCollapsible [(open)]="open" (openChange)="emissions.push($event)">
          <button arkCollapsibleTrigger></button>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)

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
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: `
        <div arkCollapsible [open]="open()">
          <button arkCollapsibleTrigger></button>
        </div>
      `,
    })
    class Host {
      readonly open = signal<boolean | undefined>(true)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
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

  it('[defaultOpen] property binding starts the collapsible open', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: '<div arkCollapsible [defaultOpen]="true"><button arkCollapsibleTrigger></button></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('[lazyMount] exposes isUnmounted until the collapsible is opened', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger, ArkCollapsibleContent],
      template: `
        <div arkCollapsible lazyMount #collapsible="arkCollapsible">
          <button arkCollapsibleTrigger></button>
          @if (!collapsible.isUnmounted()) {
            <div arkCollapsibleContent>Content</div>
          }
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)

    expect(root.isUnmounted()).toBe(true)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).toBeNull()

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.isUnmounted()).toBe(false)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).not.toBeNull()

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.isUnmounted()).toBe(false)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).not.toBeNull()

    fixture.destroy()
  })

  it('[lazyMount][unmountOnExit] exposes isUnmounted after closing again', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger, ArkCollapsibleContent],
      template: `
        <div arkCollapsible lazyMount unmountOnExit #collapsible="arkCollapsible" (exitComplete)="onExitComplete()">
          <button arkCollapsibleTrigger></button>
          @if (!collapsible.isUnmounted()) {
            <div arkCollapsibleContent>Content</div>
          }
        </div>
      `,
    })
    class Host {
      exitCount = 0
      onExitComplete(): void {
        this.exitCount += 1
      }
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement

    expect(root.isUnmounted()).toBe(true)

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.isUnmounted()).toBe(false)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).not.toBeNull()

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.isUnmounted()).toBe(false)
    const contentDebug = fixture.debugElement.query(By.directive(ArkCollapsibleContent))
    expect(contentDebug).not.toBeNull()

    contentDebug.nativeElement.dispatchEvent(new Event('animationend', { bubbles: true }))
    root.send({ type: 'animation.end' })
    TestBed.tick()
    fixture.detectChanges()

    expect(root.isUnmounted()).toBe(true)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).toBeNull()
    expect(fixture.componentInstance.exitCount).toBe(1)

    fixture.destroy()
  })

  it('bare static defaultOpen attribute starts the collapsible open via booleanAttribute (AC 21)', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: '<div arkCollapsible defaultOpen><button arkCollapsibleTrigger></button></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('clicking a disabled trigger does not change open (AC 11)', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger],
      template: `
        <div arkCollapsible [disabled]="true" (openChange)="emissions.push($event)">
          <button arkCollapsibleTrigger></button>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<boolean | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().disabled).toBe(true)
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().open).toBe(false)
    expect(fixture.componentInstance.emissions).toEqual([])

    fixture.destroy()
  })

  it('[arkCollapsibleIndicator] applies api().getIndicatorProps() and reflects open via data-state', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRoot, ArkCollapsibleTrigger, ArkCollapsibleIndicator],
      template: `
        <div arkCollapsible>
          <button arkCollapsibleTrigger>
            <span arkCollapsibleIndicator></span>
          </button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indicatorEl = fixture.debugElement.query(By.directive(ArkCollapsibleIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('collapsible')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')
    expect(indicatorEl.getAttribute('data-state')).toBe('closed')

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(indicatorEl.getAttribute('data-state')).toBe('open')

    fixture.destroy()
  })

  it('[arkCollapsibleRootProvider] delegates context to descendants', () => {
    @Component({
      standalone: true,
      imports: [ArkCollapsibleRootProvider, ArkCollapsibleTrigger, ArkCollapsibleContent, CollapsibleProbe],
      template: `
        <div arkCollapsibleRootProvider [value]="collapsible">
          <button arkCollapsibleTrigger collapsibleProbe></button>
          <div arkCollapsibleContent></div>
        </div>
      `,
    })
    class Host {
      readonly collapsible: UseCollapsibleReturn = runInInjectionContext(inject(Injector), () =>
        useCollapsible({ context: () => ({}) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const providerDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRootProvider))
    const providerInstance = providerDebug.injector.get(ArkCollapsibleRootProvider)
    const probeDebug = fixture.debugElement.query(By.directive(CollapsibleProbe))
    const probeContext = probeDebug.injector.get(ARK_COLLAPSIBLE_CONTEXT)

    expect(probeContext).toBe(providerInstance)
    expect(probeContext.api().open).toBe(false)

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(probeContext.api().open).toBe(true)

    fixture.destroy()
  })

  it('CollapsibleBasicExample renders root, trigger, content with proper data attributes', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleBasicExample] })
    const fixture = TestBed.createComponent(CollapsibleBasicExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkCollapsibleRoot)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('collapsible')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    expect(triggerEl.getAttribute('data-scope')).toBe('collapsible')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('CollapsibleDisabledExample marks the root disabled', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleDisabledExample] })
    const fixture = TestBed.createComponent(CollapsibleDisabledExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    expect(root.api().disabled).toBe(true)

    fixture.destroy()
  })

  it('CollapsibleInitialOpenExample starts open', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleInitialOpenExample] })
    const fixture = TestBed.createComponent(CollapsibleInitialOpenExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('CollapsibleLazyMountExample starts unmounted and mounts content after trigger click', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleLazyMountExample] })
    const fixture = TestBed.createComponent(CollapsibleLazyMountExample)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkCollapsibleRoot))
    const root = rootDebug.injector.get(ArkCollapsibleRoot)
    expect(root.isUnmounted()).toBe(true)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).toBeNull()

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.isUnmounted()).toBe(false)
    expect(fixture.debugElement.query(By.directive(ArkCollapsibleContent))).not.toBeNull()

    fixture.destroy()
  })

  it('CollapsibleNestedExample mounts multiple independent roots', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleNestedExample] })
    const fixture = TestBed.createComponent(CollapsibleNestedExample)
    fixture.detectChanges()

    const roots = fixture.debugElement.queryAll(By.directive(ArkCollapsibleRoot))
    expect(roots.length).toBe(3)

    fixture.destroy()
  })

  it('CollapsibleRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [CollapsibleRootProviderExample] })
    const fixture = TestBed.createComponent(CollapsibleRootProviderExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkCollapsibleTrigger)).nativeElement as HTMLButtonElement
    expect(fixture.componentInstance.openLabel()).toBe('false')

    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('true')

    fixture.destroy()
  })
})
