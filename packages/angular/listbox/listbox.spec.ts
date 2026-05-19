import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { createListCollection, type ListCollection } from '@ark-ui/angular/collection'
import {
  ARK_LISTBOX_CONTEXT,
  ARK_LISTBOX_ITEM_CONTEXT,
  ArkListboxContent,
  ArkListboxEmpty,
  ArkListboxInput,
  ArkListboxItem,
  ArkListboxItemGroup,
  ArkListboxItemGroupLabel,
  ArkListboxItemIndicator,
  ArkListboxItemText,
  ArkListboxLabel,
  ArkListboxRoot,
  ArkListboxRootProvider,
  ArkListboxValueText,
  injectArkListboxContext,
  injectArkListboxItemContext,
  listboxAnatomy,
  useListbox,
  type ListboxApi,
  type ListboxMachine,
  type ListboxMachineProps,
  type ListboxService,
  type UseListboxOptions,
  type UseListboxProps,
  type UseListboxReturn,
} from '@ark-ui/angular/listbox'

type ListboxPublicTypeSmoke = [
  ListboxApi,
  ListboxMachine,
  ListboxMachineProps,
  ListboxService,
  UseListboxOptions,
  UseListboxProps,
  UseListboxReturn,
]

interface Country {
  label: string
  value: string
}

const makeCollection = (): ListCollection<Country> =>
  createListCollection<Country>({
    items: [
      { label: 'Alpha', value: 'a' },
      { label: 'Bravo', value: 'b' },
      { label: 'Charlie', value: 'c' },
    ],
  })

const flushMicrotasks = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

const pressKey = (el: HTMLElement, key: string) => {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }))
}

describe('@ark-ui/angular/listbox', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    // noop
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_LISTBOX_CONTEXT).toBe('object')
    expect(typeof ARK_LISTBOX_ITEM_CONTEXT).toBe('object')
    expect(typeof injectArkListboxContext).toBe('function')
    expect(typeof injectArkListboxItemContext).toBe('function')
    expect(typeof useListbox).toBe('function')
    expect(typeof listboxAnatomy).toBe('object')
    expect(ArkListboxRoot).toBeDefined()
    expect(ArkListboxRootProvider).toBeDefined()
    expect(ArkListboxLabel).toBeDefined()
    expect(ArkListboxInput).toBeDefined()
    expect(ArkListboxContent).toBeDefined()
    expect(ArkListboxEmpty).toBeDefined()
    expect(ArkListboxItemGroup).toBeDefined()
    expect(ArkListboxItemGroupLabel).toBeDefined()
    expect(ArkListboxItem).toBeDefined()
    expect(ArkListboxItemText).toBeDefined()
    expect(ArkListboxItemIndicator).toBeDefined()
    expect(ArkListboxValueText).toBeDefined()
    expect(undefined as ListboxPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('orphan item-text without an item parent throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItemText],
      template: `
        <div arkListboxRoot [collection]="collection">
          <div arkListboxContent>
            <span arkListboxItemText>orphan</span>
          </div>
        </div>
      `,
    })
    class Orphan {
      readonly collection = makeCollection()
    }
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_LISTBOX_ITEM_CONTEXT|No provider|missing-provider/i)
  })

  it('orphan content directive without a root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxContent],
      template: '<div arkListboxContent></div>',
    })
    class Orphan {}
    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_LISTBOX_CONTEXT|No provider|NG0201/i)
  })

  it('clicking an item updates the api value (single selection)', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot #root="arkListboxRoot" [collection]="collection">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkListboxRoot)).injector.get(ArkListboxRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkListboxItem))
    ;(items[1].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toEqual(['b'])

    fixture.destroy()
  })

  it('supports multiple selection via selectionMode="multiple"', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot #root="arkListboxRoot" [collection]="collection" selectionMode="multiple">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkListboxRoot)).injector.get(ArkListboxRoot)
    const items = fixture.debugElement.queryAll(By.directive(ArkListboxItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    ;(items[2].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value.sort()).toEqual(['a', 'c'])

    fixture.destroy()
  })

  it('keyboard ArrowDown on content moves the highlighted value', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot #root="arkListboxRoot" [collection]="collection">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkListboxRoot)).injector.get(ArkListboxRoot)
    const contentEl = fixture.debugElement.query(By.directive(ArkListboxContent)).nativeElement as HTMLElement
    contentEl.focus()
    pressKey(contentEl, 'ArrowDown')
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().highlightedValue).toBe('a')

    pressKey(contentEl, 'ArrowDown')
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().highlightedValue).toBe('b')

    fixture.destroy()
  })

  it('empty state renders content visible when collection is empty', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxEmpty],
      template: `
        <div arkListboxRoot [collection]="collection">
          <div arkListboxContent>
            <div arkListboxEmpty>no items</div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = createListCollection<Country>({ items: [] })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const emptyEl = fixture.debugElement.query(By.directive(ArkListboxEmpty)).nativeElement as HTMLElement
    expect(emptyEl.getAttribute('data-scope')).toBe('listbox')
    expect(emptyEl.getAttribute('data-part')).toBe('empty')
    expect(emptyEl.getAttribute('role')).toBe('presentation')
    expect(emptyEl.style.display).not.toBe('none')

    fixture.destroy()
  })

  it('empty state is hidden when the collection has items', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxEmpty],
      template: `
        <div arkListboxRoot [collection]="collection">
          <div arkListboxContent>
            <div arkListboxEmpty>no items</div>
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

    const emptyEl = fixture.debugElement.query(By.directive(ArkListboxEmpty)).nativeElement as HTMLElement
    expect(emptyEl.style.display).toBe('none')

    fixture.destroy()
  })

  it('item context drives item-text and item-indicator attrs', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText, ArkListboxItemIndicator],
      template: `
        <div arkListboxRoot [collection]="collection">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
                <span arkListboxItemIndicator>✓</span>
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

    const text = fixture.debugElement.query(By.directive(ArkListboxItemText)).nativeElement as HTMLElement
    const indicator = fixture.debugElement.query(By.directive(ArkListboxItemIndicator)).nativeElement as HTMLElement
    expect(text.getAttribute('data-part')).toBe('item-text')
    expect(indicator.getAttribute('data-part')).toBe('item-indicator')

    fixture.destroy()
  })

  it('renders disabled items with aria-disabled attributes', () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot [collection]="collection">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = createListCollection<Country>({
        items: [
          { label: 'Alpha', value: 'a' },
          { label: 'Bravo', value: 'b', disabled: true },
          { label: 'Charlie', value: 'c' },
        ],
      })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkListboxItem))
    const disabledItem = items[1].nativeElement as HTMLElement
    expect(disabledItem.getAttribute('role')).toBe('option')
    expect(disabledItem.getAttribute('aria-disabled')).toBe('true')

    fixture.destroy()
  })

  it('emits valueChange and select details when an item is selected', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot [collection]="collection" (valueChange)="onValueChange($event)" (select)="onSelect($event)">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
              </div>
            }
          </div>
        </div>
      `,
    })
    class Host {
      readonly collection = makeCollection()
      valueDetails: unknown
      selectDetails: unknown

      onValueChange(details: unknown): void {
        this.valueDetails = details
      }

      onSelect(details: unknown): void {
        this.selectDetails = details
      }
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const items = fixture.debugElement.queryAll(By.directive(ArkListboxItem))
    ;(items[0].nativeElement as HTMLElement).click()
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.valueDetails).toEqual({
      items: [{ label: 'Alpha', value: 'a' }],
      value: ['a'],
    })
    expect(fixture.componentInstance.selectDetails).toEqual({ value: 'a' })

    fixture.destroy()
  })

  it('controlled [(value)] roundtrips with the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot [collection]="collection" [(value)]="value">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkListboxRoot)).injector.get(ArkListboxRoot)
    expect(root.api().value).toEqual([])

    fixture.componentInstance.value.set(['b'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['b'])

    fixture.componentInstance.value.set(['c'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toEqual(['c'])

    fixture.destroy()
  })

  it('controlled [(highlightedValue)] roundtrips with the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [ArkListboxRoot, ArkListboxContent, ArkListboxItem, ArkListboxItemText],
      template: `
        <div arkListboxRoot [collection]="collection" [(highlightedValue)]="highlighted">
          <div arkListboxContent>
            @for (item of collection.items; track item.value) {
              <div arkListboxItem [item]="item">
                <span arkListboxItemText>{{ item.label }}</span>
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

    const root = fixture.debugElement.query(By.directive(ArkListboxRoot)).injector.get(ArkListboxRoot)
    fixture.componentInstance.highlighted.set('b')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().highlightedValue).toBe('b')

    const contentEl = fixture.debugElement.query(By.directive(ArkListboxContent)).nativeElement as HTMLElement
    contentEl.focus()
    pressKey(contentEl, 'ArrowDown')
    await flushMicrotasks()
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.highlighted()).toBe('c')

    fixture.destroy()
  })

  it('package source files do not import @angular/forms', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const files = readdirSync(here).filter(
      (f) => f.endsWith('.ts') && !f.endsWith('.spec.ts') && !f.endsWith('.stories.ts'),
    )
    for (const file of files) {
      const source = readFileSync(join(here, file), 'utf-8')
      expect(source, `${file} must not import @angular/forms`).not.toMatch(/@angular\/forms/)
    }
  })
})
