import { Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_ACCORDION_CONTEXT,
  ARK_ACCORDION_ITEM_CONTEXT,
  ArkAccordionContext,
  ArkAccordionItem,
  ArkAccordionItemContextDirective,
  ArkAccordionItemContent,
  ArkAccordionItemIndicator,
  ArkAccordionItemTrigger,
  ArkAccordionRoot,
  ArkAccordionRootProvider,
  accordionAnatomy,
  injectArkAccordionContext,
  injectArkAccordionItemContext,
  useAccordion,
  type AccordionContextTemplate,
  type AccordionApi,
  type AccordionElementIds,
  type AccordionFocusChangeDetails,
  type AccordionItemContextTemplate,
  type AccordionItemProps,
  type AccordionItemState,
  type AccordionMachine,
  type AccordionMachineProps,
  type AccordionService,
  type AccordionValueChangeDetails,
  type ArkAccordionItemContext,
  type UseAccordionOptions,
  type UseAccordionProps,
  type UseAccordionReturn,
} from '@ark-ui/angular/accordion'
import { AccordionBasicExample } from './examples/basic'
import { AccordionContextExample } from './examples/context'
import { AccordionDisabledExample } from './examples/disabled'
import { AccordionMultipleExample } from './examples/multiple'
import { AccordionRootProviderExample } from './examples/root-provider'

type AccordionPublicTypeSmoke = [
  AccordionApi,
  AccordionElementIds,
  AccordionFocusChangeDetails,
  AccordionContextTemplate,
  AccordionItemContextTemplate,
  AccordionItemProps,
  AccordionItemState,
  AccordionMachine,
  AccordionMachineProps,
  AccordionService,
  AccordionValueChangeDetails,
  ArkAccordionItemContext,
  UseAccordionOptions,
  UseAccordionProps,
  UseAccordionReturn,
]

@Directive({ selector: '[accordionRootProbe]', standalone: true, exportAs: 'accordionRootProbe' })
class AccordionRootProbe {
  private readonly _injector = inject(Injector)
  get captured(): UseAccordionReturn {
    return this._injector.get(ARK_ACCORDION_CONTEXT)
  }
}

@Directive({ selector: '[accordionItemProbe]', standalone: true, exportAs: 'accordionItemProbe' })
class AccordionItemProbe {
  private readonly _injector = inject(Injector)
  get captured(): ArkAccordionItemContext {
    return this._injector.get(ARK_ACCORDION_ITEM_CONTEXT)
  }
}

describe('@ark-ui/angular/accordion', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_ACCORDION_CONTEXT).toBe('object')
    expect(typeof ARK_ACCORDION_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkAccordionContext).toBe('function')
    expect(typeof injectArkAccordionItemContext).toBe('function')
    expect(typeof useAccordion).toBe('function')
    expect(typeof accordionAnatomy).toBe('object')
    expect(ArkAccordionRoot).toBeDefined()
    expect(ArkAccordionRootProvider).toBeDefined()
    expect(ArkAccordionItem).toBeDefined()
    expect(ArkAccordionItemTrigger).toBeDefined()
    expect(ArkAccordionItemContent).toBeDefined()
    expect(ArkAccordionItemIndicator).toBeDefined()
    expect(ArkAccordionContext).toBeDefined()
    expect(ArkAccordionItemContextDirective).toBeDefined()
    expect(undefined as AccordionPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useAccordion({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useAccordion({ context: () => ({}) }))
    const id = (result.api().getRootProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/accordion::/)

    fixture.destroy()
  })

  it('descendant probes receive root and item contexts from the nearest directives', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, AccordionRootProbe, AccordionItemProbe],
      template: `
        <div arkAccordion>
          <div arkAccordionItem value="one" accordionRootProbe accordionItemProbe></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const rootProbe = fixture.debugElement.query(By.directive(AccordionRootProbe)).injector.get(AccordionRootProbe)
    const itemProbe = fixture.debugElement.query(By.directive(AccordionItemProbe)).injector.get(AccordionItemProbe)

    expect(rootProbe.captured).toBe(root)
    expect(itemProbe.captured.value()).toBe('one')
    expect(itemProbe.captured.state().expanded).toBe(false)

    fixture.destroy()
  })

  it('[arkAccordionContext] exposes the root api in templates', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionContext],
      template: `
        <div arkAccordion [defaultValue]="['one']">
          <ng-container *arkAccordionContext="let accordion">
            <output>{{ accordion().value.join(',') || 'none' }}</output>
          </ng-container>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const outputEl = fixture.debugElement.query(By.css('output')).nativeElement as HTMLOutputElement
    expect(outputEl.textContent?.trim()).toBe('one')

    fixture.destroy()
  })

  it('[arkAccordionItemContext] exposes item state in templates', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger, ArkAccordionItemContextDirective],
      template: `
        <div arkAccordion [defaultValue]="['one']">
          <div arkAccordionItem value="one">
            <button arkAccordionItemTrigger>
              <ng-container *arkAccordionItemContext="let context">
                <span>{{ context.state().expanded ? 'expanded' : 'collapsed' }}</span>
              </ng-container>
            </button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const stateEl = fixture.debugElement.query(By.css('span')).nativeElement as HTMLSpanElement
    expect(stateEl.textContent?.trim()).toBe('expanded')

    fixture.destroy()
  })

  it('orphan [arkAccordionItemTrigger] without ancestor [arkAccordion] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionItemTrigger],
      template: '<button arkAccordionItemTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_ACCORDION_CONTEXT|No provider|NG0201/i)
  })

  it('item part under a root but outside [arkAccordionItem] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItemTrigger],
      template: '<div arkAccordion><button arkAccordionItemTrigger></button></div>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_ACCORDION_ITEM_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item trigger expands it, updates part state, and emits (valueChange) exactly once', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger, ArkAccordionItemContent],
      template: `
        <div arkAccordion (valueChange)="emissions.push($event)">
          <div arkAccordionItem value="one">
            <button arkAccordionItemTrigger></button>
            <div arkAccordionItemContent></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement
    const contentEl = fixture.debugElement.query(By.directive(ArkAccordionItemContent)).nativeElement as HTMLElement

    expect(root.api().value).toEqual([])
    expect(triggerEl.getAttribute('data-state')).toBe('closed')
    expect(contentEl.hasAttribute('hidden')).toBe(true)

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['one'])
    expect(triggerEl.getAttribute('data-state')).toBe('open')
    expect(contentEl.hasAttribute('hidden')).toBe(false)
    expect(fixture.componentInstance.emissions).toEqual([['one']])

    fixture.destroy()
  })

  it('emits (focusChange) when focus moves between item triggers', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger],
      template: `
        <div arkAccordion (focusChange)="focusDetails.push($event)">
          <div arkAccordionItem value="one"><button arkAccordionItemTrigger>One</button></div>
          <div arkAccordionItem value="two"><button arkAccordionItemTrigger>Two</button></div>
        </div>
      `,
    })
    class Host {
      readonly focusDetails: AccordionFocusChangeDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const triggers = fixture.debugElement
      .queryAll(By.directive(ArkAccordionItemTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)

    triggers[0].focus()
    TestBed.tick()
    fixture.detectChanges()
    triggers[1].focus()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.focusDetails.length).toBeGreaterThan(0)
    expect(document.activeElement).toBe(triggers[1])

    fixture.destroy()
  })

  it('supports multiple expanded items', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger],
      template: `
        <div arkAccordion multiple>
          <div arkAccordionItem value="one"><button arkAccordionItemTrigger></button></div>
          <div arkAccordionItem value="two"><button arkAccordionItemTrigger></button></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const triggers = fixture.debugElement
      .queryAll(By.directive(ArkAccordionItemTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)

    triggers[0].focus()
    triggers[0].click()
    TestBed.tick()
    fixture.detectChanges()
    triggers[1].focus()
    triggers[1].click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['one', 'two'])

    fixture.destroy()
  })

  it('supports collapsible single item mode', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger],
      template: `
        <div arkAccordion collapsible [defaultValue]="['one']">
          <div arkAccordionItem value="one"><button arkAccordionItemTrigger></button></div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement

    expect(root.api().value).toEqual(['one'])

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([])

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal and emits once for a trigger change', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger],
      template: `
        <div arkAccordion [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkAccordionItem value="one"><button arkAccordionItemTrigger></button></div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string[] | undefined>([])
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['one'])
    expect(fixture.componentInstance.value()).toEqual(['one'])
    expect(fixture.componentInstance.emissions).toEqual([['one']])

    fixture.componentInstance.value.set(['one'])
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions).toEqual([['one']])

    fixture.destroy()
  })

  it('clicking a disabled item trigger does not change value or emit', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger],
      template: `
        <div arkAccordion (valueChange)="emissions.push($event)">
          <div arkAccordionItem value="one" disabled>
            <button arkAccordionItemTrigger></button>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement

    expect(triggerEl.disabled).toBe(true)
    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([])
    expect(fixture.componentInstance.emissions).toEqual([])

    fixture.destroy()
  })

  it('[arkAccordionItemIndicator] reflects item state', () => {
    @Component({
      standalone: true,
      imports: [ArkAccordionRoot, ArkAccordionItem, ArkAccordionItemTrigger, ArkAccordionItemIndicator],
      template: `
        <div arkAccordion>
          <div arkAccordionItem value="one">
            <button arkAccordionItemTrigger>
              <span arkAccordionItemIndicator></span>
            </button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indicatorEl = fixture.debugElement.query(By.directive(ArkAccordionItemIndicator)).nativeElement as HTMLElement
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement

    expect(indicatorEl.getAttribute('data-scope')).toBe('accordion')
    expect(indicatorEl.getAttribute('data-part')).toBe('item-indicator')
    expect(indicatorEl.getAttribute('data-state')).toBe('closed')

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(indicatorEl.getAttribute('data-state')).toBe('open')

    fixture.destroy()
  })

  it('[arkAccordionRootProvider] delegates context to descendants', () => {
    @Component({
      standalone: true,
      imports: [
        ArkAccordionRootProvider,
        ArkAccordionItem,
        ArkAccordionItemTrigger,
        ArkAccordionItemContent,
        AccordionRootProbe,
      ],
      template: `
        <div arkAccordionRootProvider [value]="accordion">
          <div arkAccordionItem value="one">
            <button arkAccordionItemTrigger accordionRootProbe></button>
            <div arkAccordionItemContent></div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly accordion: UseAccordionReturn = runInInjectionContext(inject(Injector), () =>
        useAccordion({ context: () => ({}) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const provider = fixture.debugElement
      .query(By.directive(ArkAccordionRootProvider))
      .injector.get(ArkAccordionRootProvider)
    const probeContext = fixture.debugElement
      .query(By.directive(AccordionRootProbe))
      .injector.get(ARK_ACCORDION_CONTEXT)
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger))
      .nativeElement as HTMLButtonElement

    expect(probeContext).toBe(provider)
    expect(probeContext.api().value).toEqual([])

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(probeContext.api().value).toEqual(['one'])

    fixture.destroy()
  })

  it('AccordionBasicExample renders root, item, trigger, and content attributes', () => {
    TestBed.configureTestingModule({ imports: [AccordionBasicExample] })
    const fixture = TestBed.createComponent(AccordionBasicExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkAccordionRoot)).nativeElement as HTMLElement
    const itemEl = fixture.debugElement.query(By.directive(ArkAccordionItem)).nativeElement as HTMLElement
    const triggerEl = fixture.debugElement.query(By.directive(ArkAccordionItemTrigger)).nativeElement as HTMLElement
    const contentEl = fixture.debugElement.query(By.directive(ArkAccordionItemContent)).nativeElement as HTMLElement

    expect(rootEl.getAttribute('data-scope')).toBe('accordion')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    expect(itemEl.getAttribute('data-part')).toBe('item')
    expect(triggerEl.getAttribute('data-part')).toBe('item-trigger')
    expect(contentEl.getAttribute('data-part')).toBe('item-content')

    fixture.destroy()
  })

  it('AccordionDisabledExample disables only the disabled item trigger', () => {
    TestBed.configureTestingModule({ imports: [AccordionDisabledExample] })
    const fixture = TestBed.createComponent(AccordionDisabledExample)
    fixture.detectChanges()

    const triggers = fixture.debugElement
      .queryAll(By.directive(ArkAccordionItemTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)
    expect(triggers.map((trigger) => trigger.disabled)).toEqual([false, true, false])

    fixture.destroy()
  })

  it('AccordionMultipleExample starts with the React default item expanded', () => {
    TestBed.configureTestingModule({ imports: [AccordionMultipleExample] })
    const fixture = TestBed.createComponent(AccordionMultipleExample)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkAccordionRoot)).injector.get(ArkAccordionRoot)
    expect(root.api().value).toEqual(['ark-ui'])

    fixture.destroy()
  })

  it('AccordionContextExample renders root context details', () => {
    TestBed.configureTestingModule({ imports: [AccordionContextExample] })
    const fixture = TestBed.createComponent(AccordionContextExample)
    fixture.detectChanges()

    const outputEl = fixture.debugElement.query(By.css('output')).nativeElement as HTMLOutputElement
    expect(outputEl.textContent).toContain('context.value')
    expect(outputEl.textContent).toContain('ark-ui')
    expect(outputEl.textContent).toContain('context.focusedValue')

    fixture.destroy()
  })

  it('AccordionRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [AccordionRootProviderExample] })
    const fixture = TestBed.createComponent(AccordionRootProviderExample)
    fixture.detectChanges()

    const triggers = fixture.debugElement
      .queryAll(By.directive(ArkAccordionItemTrigger))
      .map((debug) => debug.nativeElement as HTMLButtonElement)
    const triggerEl = triggers[1]
    expect(fixture.componentInstance.valueLabel()).toBe('ark-ui')

    triggerEl.focus()
    triggerEl.click()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.valueLabel()).toBe('ark-ui, getting-started')

    fixture.destroy()
  })
})
