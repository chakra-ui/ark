import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ARK_SELECT_CONTEXT,
  ARK_SELECT_ITEM_CONTEXT,
  ArkSelectClearTrigger,
  ArkSelectContent,
  ArkSelectControl,
  ArkSelectHiddenSelect,
  ArkSelectIndicator,
  ArkSelectItem,
  ArkSelectItemGroup,
  ArkSelectItemGroupLabel,
  ArkSelectItemIndicator,
  ArkSelectItemText,
  ArkSelectLabel,
  ArkSelectList,
  ArkSelectPositioner,
  ArkSelectRoot,
  ArkSelectRootProvider,
  ArkSelectTrigger,
  ArkSelectValueText,
  injectArkSelectContext,
  injectArkSelectItemContext,
  selectAnatomy,
  useSelect,
  type SelectApi,
  type SelectFocusOutsideEvent,
  type SelectInteractOutsideEvent,
  type SelectMachine,
  type SelectMachineProps,
  type SelectPointerDownOutsideEvent,
  type SelectService,
  type UseSelectOptions,
  type UseSelectProps,
  type UseSelectReturn,
} from '@ark-ui/angular/select'

type SelectPublicTypeSmoke = [
  SelectApi,
  SelectFocusOutsideEvent,
  SelectInteractOutsideEvent,
  SelectMachine,
  SelectMachineProps,
  SelectPointerDownOutsideEvent,
  SelectService,
  UseSelectOptions,
  UseSelectProps,
  UseSelectReturn,
]

interface Framework {
  label: string
  value: string
  disabled?: boolean
}

const makeCollection = (): ListCollection<Framework> =>
  createListCollection<Framework>({
    items: [
      { label: 'React', value: 'react' },
      { label: 'Solid', value: 'solid' },
      { label: 'Vue', value: 'vue' },
    ],
  })

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

describe('@ark-ui/angular/select', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    if (typeof (Element.prototype as { scrollTo?: unknown }).scrollTo !== 'function') {
      ;(Element.prototype as unknown as { scrollTo: () => void }).scrollTo = () => {}
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_SELECT_CONTEXT).toBe('object')
    expect(typeof ARK_SELECT_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkSelectContext).toBe('function')
    expect(typeof injectArkSelectItemContext).toBe('function')
    expect(typeof useSelect).toBe('function')
    expect(typeof selectAnatomy).toBe('object')
    expect(ArkSelectRoot).toBeDefined()
    expect(ArkSelectRootProvider).toBeDefined()
    expect(ArkSelectLabel).toBeDefined()
    expect(ArkSelectControl).toBeDefined()
    expect(ArkSelectTrigger).toBeDefined()
    expect(ArkSelectIndicator).toBeDefined()
    expect(ArkSelectClearTrigger).toBeDefined()
    expect(ArkSelectValueText).toBeDefined()
    expect(ArkSelectHiddenSelect).toBeDefined()
    expect(ArkSelectPositioner).toBeDefined()
    expect(ArkSelectContent).toBeDefined()
    expect(ArkSelectList).toBeDefined()
    expect(ArkSelectItemGroup).toBeDefined()
    expect(ArkSelectItemGroupLabel).toBeDefined()
    expect(ArkSelectItem).toBeDefined()
    expect(ArkSelectItemText).toBeDefined()
    expect(ArkSelectItemIndicator).toBeDefined()
    expect(undefined as SelectPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('orphan item-text without an item parent throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection">
          <div arkSelectContent>
            <span arkSelectItemText>orphan</span>
          </div>
        </div>
      `,
    })
    class Orphan {
      readonly collection = makeCollection()
    }
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_SELECT_ITEM_CONTEXT|No provider|missing-provider/i)
  })

  it('orphan content directive without a root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkSelectContent],
      template: '<div arkSelectContent></div>',
    })
    class Orphan {}
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_SELECT_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item updates the api value (single selection)', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['solid'])
    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('renders selected item text in value text when using a placeholder', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectValueText, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection">
          <span arkSelectValueText placeholder="Pick one"></span>
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const valueText = fixture.debugElement.query(By.directive(ArkSelectValueText)).nativeElement as HTMLElement
    expect(valueText.textContent).toBe('Pick one')

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(valueText.textContent).toBe('Solid')

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips with the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection" [(value)]="value">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly value = signal<string[] | undefined>([])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    expect(root.api().value).toEqual([])

    fixture.componentInstance.value.set(['solid'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['solid'])

    fixture.componentInstance.value.set(['vue'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['vue'])

    fixture.destroy()
  })

  it('supports multiple selection via [multiple]', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection" [multiple]="true">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    ;(items[2].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value.sort()).toEqual(['react', 'vue'])

    fixture.destroy()
  })

  it('hidden select renders one option per item with selected marking the current value', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectHiddenSelect],
      template: `
        <div arkSelectRoot [collection]="collection" [(value)]="value">
          <select arkSelectHiddenSelect></select>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly value = signal<string[] | undefined>(['vue'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const select = fixture.debugElement.query(By.directive(ArkSelectHiddenSelect)).nativeElement as HTMLSelectElement
    const options = Array.from(select.querySelectorAll('option'))
    const values = options.map((o) => o.value)
    expect(values).toContain('react')
    expect(values).toContain('solid')
    expect(values).toContain('vue')
    const selected = options.find((o) => o.hasAttribute('selected'))
    expect(selected?.value).toBe('vue')

    fixture.destroy()
  })

  it('merges Field disabled/invalid/readOnly state and IDs into the select api', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkSelectRoot, ArkSelectLabel, ArkSelectControl, ArkSelectHiddenSelect],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true" [invalid]="true" [readOnly]="true">
          <div arkSelectRoot [collection]="collection">
            <label arkSelectLabel>Pick</label>
            <div arkSelectControl></div>
            <select arkSelectHiddenSelect></select>
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    expect(root.api().disabled).toBe(true)
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()

    fixture.destroy()
  })

  it('reactive [formControl] writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkSelectRoot, ArkSelectHiddenSelect],
      template: `
        <div arkSelectRoot [collection]="collection" [formControl]="control">
          <select arkSelectHiddenSelect></select>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly control = new FormControl<string[] | null>(['react'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    expect(root.api().value).toEqual(['react'])

    fixture.componentInstance.control.setValue(['vue'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['vue'])

    fixture.destroy()
  })

  it('marks reactive form controls touched when an item is selected', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection" [formControl]="control">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly control = new FormControl<string[] | null>([])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(false)
    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkSelectRoot, ArkSelectHiddenSelect],
      template: `
        <div arkSelectRoot [collection]="collection" [(ngModel)]="model" name="sel">
          <select arkSelectHiddenSelect></select>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      model: string[] = ['solid']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    expect(root.api().value).toEqual(['solid'])

    fixture.destroy()
  })

  it('controlled [(open)] channel roundtrips', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent],
      template: `
        <div arkSelectRoot [collection]="collection" [(open)]="open">
          <div arkSelectContent></div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly open = signal<boolean | undefined>(false)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('controlled [(highlightedValue)] roundtrips', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection" [(highlightedValue)]="highlighted">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly highlighted = signal<string | null | undefined>(null)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    fixture.componentInstance.highlighted.set('solid')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().highlightedValue).toBe('solid')

    fixture.destroy()
  })

  it('emits outside interaction callbacks from the Zag layer', () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot],
      template: `
        <div
          arkSelectRoot
          [collection]="collection"
          (focusOutside)="events.push('focus')"
          (pointerDownOutside)="events.push('pointer')"
          (interactOutside)="events.push('interact')"
        ></div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly events: string[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.service.prop('onFocusOutside')?.({} as SelectFocusOutsideEvent)
    root.service.prop('onPointerDownOutside')?.({} as SelectPointerDownOutsideEvent)
    root.service.prop('onInteractOutside')?.({} as SelectInteractOutsideEvent)

    expect(fixture.componentInstance.events).toEqual(['focus', 'pointer', 'interact'])

    fixture.destroy()
  })

  it('portaled content preserves the originating select context for child directives', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPortalComponent,
        ArkSelectRoot,
        ArkSelectPositioner,
        ArkSelectContent,
        ArkSelectItem,
        ArkSelectItemText,
        ArkSelectItemIndicator,
      ],
      template: `
        <div arkSelectRoot #root="arkSelectRoot" [collection]="collection">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkSelectPositioner>
              <div arkSelectContent>
                @for (item of collection.items; track item.value) {
                  <div arkSelectItem [item]="item" data-testid="portal-item">
                    <span arkSelectItemText>{{ item.label }}</span>
                    <span arkSelectItemIndicator>✓</span>
                  </div>
                }
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    TestBed.tick()
    fixture.detectChanges()

    const portaled = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    expect(portaled.length).toBe(3)
    const itemDir = portaled[0].injector.get(ArkSelectItem)
    expect(itemDir.item().value).toBe('react')
    const ctxFromChild = portaled[0].injector.get(ARK_SELECT_CONTEXT)
    expect(ctxFromChild).toBeDefined()

    fixture.destroy()
  })

  it('item context exposes typed item value to descendants', () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText, ArkSelectItemIndicator],
      template: `
        <div arkSelectRoot [collection]="collection">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
                <span arkSelectItemIndicator>✓</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const text = fixture.debugElement.query(By.directive(ArkSelectItemText)).nativeElement as HTMLElement
    const indicator = fixture.debugElement.query(By.directive(ArkSelectItemIndicator)).nativeElement as HTMLElement
    expect(text.getAttribute('data-part')).toBe('item-text')
    expect(indicator.getAttribute('data-part')).toBe('item-indicator')

    fixture.destroy()
  })

  it('emits a single valueChange per user-visible value change', async () => {
    @Component({
      standalone: true,
      imports: [ArkSelectRoot, ArkSelectContent, ArkSelectItem, ArkSelectItemText],
      template: `
        <div arkSelectRoot [collection]="collection" (valueChange)="emissions.push($event.value)">
          <div arkSelectContent>
            @for (item of collection.items; track item.value) {
              <div arkSelectItem [item]="item">
                <span arkSelectItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly emissions: string[][] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const items = fixture.debugElement.queryAll(By.directive(ArkSelectItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkSelectRoot, ArkSelectHiddenSelect],
      template: `
        <div arkSelectRoot [collection]="collection" [formControl]="control" [(value)]="value">
          <select arkSelectHiddenSelect></select>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly control = new FormControl<string[] | null>(['react'])
      readonly value = signal<string[] | undefined>(['vue'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkSelectRoot)).injector.get(ArkSelectRoot)
    fixture.componentInstance.control.setValue(['solid'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['solid'])

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkSelectRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })

  it('package source files do not import @angular/forms outside the root directive', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const files = readdirSync(here).filter(
      (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.endsWith('.stories.ts') && f !== 'select-root.ts',
    )
    for (const file of files) {
      const source = readFileSync(join(here, file), 'utf-8')
      expect(source, `${file} must not import @angular/forms`).not.toMatch(/@angular\/forms/)
    }
  })
})
