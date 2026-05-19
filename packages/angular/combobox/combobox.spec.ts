import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { ArkFieldErrorText, ArkFieldHelperText, ArkFieldRoot } from '@ark-ui/angular/field'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ARK_COMBOBOX_CONTEXT,
  ARK_COMBOBOX_ITEM_CONTEXT,
  ArkComboboxClearTrigger,
  ArkComboboxContent,
  ArkComboboxControl,
  ArkComboboxEmpty,
  ArkComboboxInput,
  ArkComboboxItem,
  ArkComboboxItemGroup,
  ArkComboboxItemGroupLabel,
  ArkComboboxItemIndicator,
  ArkComboboxItemText,
  ArkComboboxLabel,
  ArkComboboxList,
  ArkComboboxPositioner,
  ArkComboboxRoot,
  ArkComboboxRootProvider,
  ArkComboboxTrigger,
  comboboxAnatomy,
  injectArkComboboxContext,
  injectArkComboboxItemContext,
  useCombobox,
  type ComboboxApi,
  type ComboboxMachine,
  type ComboboxMachineProps,
  type ComboboxFocusOutsideEvent,
  type ComboboxInteractOutsideEvent,
  type ComboboxPointerDownOutsideEvent,
  type ComboboxService,
  type UseComboboxOptions,
  type UseComboboxProps,
  type UseComboboxReturn,
} from '@ark-ui/angular/combobox'

type ComboboxPublicTypeSmoke = [
  ComboboxApi,
  ComboboxMachine,
  ComboboxMachineProps,
  ComboboxFocusOutsideEvent,
  ComboboxInteractOutsideEvent,
  ComboboxPointerDownOutsideEvent,
  ComboboxService,
  UseComboboxOptions,
  UseComboboxProps,
  UseComboboxReturn,
]

interface Fruit {
  label: string
  value: string
  disabled?: boolean
}

const fruitItems: Fruit[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
]

const makeCollection = (items: Fruit[] = fruitItems): ListCollection<Fruit> => createListCollection<Fruit>({ items })

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

describe('@ark-ui/angular/combobox', () => {
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
    expect(typeof ARK_COMBOBOX_CONTEXT).toBe('object')
    expect(typeof ARK_COMBOBOX_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkComboboxContext).toBe('function')
    expect(typeof injectArkComboboxItemContext).toBe('function')
    expect(typeof useCombobox).toBe('function')
    expect(typeof comboboxAnatomy).toBe('object')
    expect(ArkComboboxRoot).toBeDefined()
    expect(ArkComboboxRootProvider).toBeDefined()
    expect(ArkComboboxLabel).toBeDefined()
    expect(ArkComboboxControl).toBeDefined()
    expect(ArkComboboxInput).toBeDefined()
    expect(ArkComboboxTrigger).toBeDefined()
    expect(ArkComboboxClearTrigger).toBeDefined()
    expect(ArkComboboxPositioner).toBeDefined()
    expect(ArkComboboxContent).toBeDefined()
    expect(ArkComboboxList).toBeDefined()
    expect(ArkComboboxEmpty).toBeDefined()
    expect(ArkComboboxItemGroup).toBeDefined()
    expect(ArkComboboxItemGroupLabel).toBeDefined()
    expect(ArkComboboxItem).toBeDefined()
    expect(ArkComboboxItemText).toBeDefined()
    expect(ArkComboboxItemIndicator).toBeDefined()
    expect(undefined as ComboboxPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('orphan item-text without an item parent throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection">
          <div arkComboboxContent>
            <span arkComboboxItemText>orphan</span>
          </div>
        </div>
      `,
    })
    class Orphan {
      readonly collection = makeCollection()
    }
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_COMBOBOX_ITEM_CONTEXT|No provider|missing-provider/i)
  })

  it('orphan content directive without a root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxContent],
      template: '<div arkComboboxContent></div>',
    })
    class Orphan {}
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_COMBOBOX_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item updates the api value', async () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxItem, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection">
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkComboboxItem))
    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['banana'])

    fixture.destroy()
  })

  it('typing in the input updates inputValue and filters via consumer-supplied collection', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkComboboxRoot,
        ArkComboboxControl,
        ArkComboboxInput,
        ArkComboboxContent,
        ArkComboboxItem,
        ArkComboboxItemText,
      ],
      template: `
        <div arkComboboxRoot [collection]="collection()" (inputValueChange)="onInput($event.inputValue)">
          <div arkComboboxControl>
            <input arkComboboxInput />
          </div>
          <div arkComboboxContent>
            @for (item of collection().items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = signal<ListCollection<Fruit>>(makeCollection())
      onInput(query: string): void {
        const lower = query.toLowerCase()
        const filtered = fruitItems.filter((item) => item.label.toLowerCase().includes(lower))
        this.collection.set(makeCollection(filtered))
      }
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    const input = fixture.debugElement.query(By.directive(ArkComboboxInput)).nativeElement as HTMLInputElement

    input.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    input.value = 'ban'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, data: 'ban', inputType: 'insertText' }))
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().inputValue).toBe('ban')
    expect(fixture.componentInstance.collection().items.map((i) => i.value)).toEqual(['banana'])

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips with the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxItem, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection" [(value)]="value">
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    expect(root.api().value).toEqual([])

    fixture.componentInstance.value.set(['banana'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['banana'])

    fixture.componentInstance.value.set(['orange'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['orange'])

    fixture.destroy()
  })

  it('controlled [(inputValue)] roundtrips', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxControl, ArkComboboxInput],
      template: `
        <div arkComboboxRoot [collection]="collection" [(inputValue)]="text">
          <div arkComboboxControl>
            <input arkComboboxInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly text = signal<string | undefined>('')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)

    fixture.componentInstance.text.set('app')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().inputValue).toBe('app')

    fixture.destroy()
  })

  it('controlled [(open)] channel roundtrips', async () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent],
      template: `
        <div arkComboboxRoot [collection]="collection" [(open)]="open">
          <div arkComboboxContent></div>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    fixture.componentInstance.open.set(true)
    TestBed.tick()
    fixture.detectChanges()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('focusable trigger opts into normal tab focus', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxControl, ArkComboboxInput, ArkComboboxTrigger],
      template: `
        <div arkComboboxRoot [collection]="collection">
          <div arkComboboxControl>
            <input arkComboboxInput />
            <button arkComboboxTrigger focusable>Toggle</button>
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

    const trigger = fixture.debugElement.query(By.directive(ArkComboboxTrigger)).nativeElement as HTMLButtonElement
    expect(trigger.getAttribute('tabindex')).toBeNull()
    expect(trigger.hasAttribute('data-focusable')).toBe(true)

    fixture.destroy()
  })

  it('reactive [formControl] writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkComboboxRoot, ArkComboboxControl, ArkComboboxInput],
      template: `
        <div arkComboboxRoot [collection]="collection" [formControl]="control">
          <div arkComboboxControl>
            <input arkComboboxInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly control = new FormControl<string[] | null>(['apple'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    expect(root.api().value).toEqual(['apple'])

    fixture.componentInstance.control.setValue(['orange'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['orange'])

    fixture.destroy()
  })

  it('marks reactive form controls touched when an item is selected', async () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkComboboxRoot, ArkComboboxContent, ArkComboboxItem, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection" [formControl]="control">
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
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
    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkComboboxItem))
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
      imports: [FormsModule, ArkComboboxRoot, ArkComboboxControl, ArkComboboxInput],
      template: `
        <div arkComboboxRoot [collection]="collection" [(ngModel)]="model" name="cmb">
          <div arkComboboxControl>
            <input arkComboboxInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      model: string[] = ['banana']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    expect(root.api().value).toEqual(['banana'])

    fixture.destroy()
  })

  it('merges Field disabled/invalid/readOnly state, IDs, and describedby into the combobox api', () => {
    @Component({
      standalone: true,
      imports: [
        ArkFieldRoot,
        ArkFieldHelperText,
        ArkFieldErrorText,
        ArkComboboxRoot,
        ArkComboboxLabel,
        ArkComboboxControl,
        ArkComboboxInput,
      ],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true" [invalid]="true" [readOnly]="true">
          <div arkComboboxRoot [collection]="collection">
            <label arkComboboxLabel>Pick</label>
            <div arkComboboxControl>
              <input arkComboboxInput />
            </div>
          </div>
          <span arkFieldHelperText>Helper</span>
          <span arkFieldErrorText>Error</span>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    expect(root.api().disabled).toBe(true)
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()
    const field = fixture.debugElement.query(By.directive(ArkFieldRoot)).injector.get(ArkFieldRoot)
    const input = fixture.debugElement.query(By.directive(ArkComboboxInput)).nativeElement as HTMLInputElement
    expect(input.getAttribute('aria-describedby')).toBe(`${field.ids.errorText} ${field.ids.helperText}`)

    fixture.destroy()
  })

  it('clear trigger empties value and inputValue', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkComboboxRoot,
        ArkComboboxControl,
        ArkComboboxInput,
        ArkComboboxClearTrigger,
        ArkComboboxContent,
        ArkComboboxItem,
        ArkComboboxItemText,
      ],
      template: `
        <div arkComboboxRoot [collection]="collection">
          <div arkComboboxControl>
            <input arkComboboxInput />
            <button arkComboboxClearTrigger>×</button>
          </div>
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    root.api().setValue(['apple'])
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['apple'])

    const clearBtn = fixture.debugElement.query(By.directive(ArkComboboxClearTrigger)).nativeElement as HTMLElement
    clearBtn.click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual([])
    expect(root.api().inputValue).toBe('')

    fixture.destroy()
  })

  it('empty state renders only when collection has no items', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxEmpty, ArkComboboxItem, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection()">
          <div arkComboboxContent>
            <div arkComboboxEmpty>No results</div>
            @for (item of collection().items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = signal<ListCollection<Fruit>>(makeCollection())
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const empty = fixture.debugElement.query(By.directive(ArkComboboxEmpty)).nativeElement as HTMLElement
    expect(empty.getAttribute('role')).toBe('presentation')
    expect(empty.style.display).toBe('none')

    fixture.componentInstance.collection.set(makeCollection([]))
    TestBed.tick()
    fixture.detectChanges()
    expect(empty.style.display).not.toBe('none')

    fixture.destroy()
  })

  it('portaled content preserves the originating combobox context for child directives', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkPortalComponent,
        ArkComboboxRoot,
        ArkComboboxPositioner,
        ArkComboboxContent,
        ArkComboboxItem,
        ArkComboboxItemText,
        ArkComboboxItemIndicator,
      ],
      template: `
        <div arkComboboxRoot #root="arkComboboxRoot" [collection]="collection">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkComboboxPositioner>
              <div arkComboboxContent>
                @for (item of collection.items; track item.value) {
                  <div arkComboboxItem [item]="item" data-testid="portal-item">
                    <span arkComboboxItemText>{{ item.label }}</span>
                    <span arkComboboxItemIndicator>✓</span>
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

    const portaled = fixture.debugElement.queryAll(By.directive(ArkComboboxItem))
    expect(portaled.length).toBe(3)
    const itemDir = portaled[0].injector.get(ArkComboboxItem)
    expect(itemDir.item().value).toBe('apple')
    const ctxFromChild = portaled[0].injector.get(ARK_COMBOBOX_CONTEXT)
    expect(ctxFromChild).toBeDefined()

    fixture.destroy()
  })

  it('item context exposes typed item value to descendants', () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxItem, ArkComboboxItemText, ArkComboboxItemIndicator],
      template: `
        <div arkComboboxRoot [collection]="collection">
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
                <span arkComboboxItemIndicator>✓</span>
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

    const text = fixture.debugElement.query(By.directive(ArkComboboxItemText)).nativeElement as HTMLElement
    const indicator = fixture.debugElement.query(By.directive(ArkComboboxItemIndicator)).nativeElement as HTMLElement
    expect(text.getAttribute('data-part')).toBe('item-text')
    expect(indicator.getAttribute('data-part')).toBe('item-indicator')

    fixture.destroy()
  })

  it('emits a single valueChange per user-visible value change', async () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxContent, ArkComboboxItem, ArkComboboxItemText],
      template: `
        <div arkComboboxRoot [collection]="collection" (valueChange)="emissions.push($event.value)">
          <div arkComboboxContent>
            @for (item of collection.items; track item.value) {
              <div arkComboboxItem [item]="item">
                <span arkComboboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkComboboxRoot)).injector.get(ArkComboboxRoot)
    root.api().setOpen(true)
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const items = fixture.debugElement.queryAll(By.directive(ArkComboboxItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('emits a single inputValueChange per user-visible input change', async () => {
    @Component({
      standalone: true,
      imports: [ArkComboboxRoot, ArkComboboxControl, ArkComboboxInput],
      template: `
        <div arkComboboxRoot [collection]="collection" (inputValueChange)="emissions.push($event.inputValue)">
          <div arkComboboxControl>
            <input arkComboboxInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      readonly emissions: string[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const input = fixture.debugElement.query(By.directive(ArkComboboxInput)).nativeElement as HTMLInputElement
    input.dispatchEvent(new FocusEvent('focus', { bubbles: true }))
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    input.value = 'a'
    input.dispatchEvent(new InputEvent('input', { bubbles: true, data: 'a', inputType: 'insertText' }))
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('package source files do not import @angular/forms outside the root directive', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const files = readdirSync(here).filter(
      (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.endsWith('.stories.ts') && f !== 'combobox-root.ts',
    )
    for (const file of files) {
      const source = readFileSync(join(here, file), 'utf-8')
      expect(source, `${file} must not import @angular/forms`).not.toMatch(/@angular\/forms/)
    }
  })
})
