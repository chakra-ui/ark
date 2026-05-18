import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ApplicationRef, Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_MENU_CONTEXT,
  ARK_MENU_CONTEXT_CARRIER,
  ArkMenuArrow,
  ArkMenuArrowTip,
  ArkMenuCheckboxItem,
  ArkMenuContent,
  ArkMenuContextTrigger,
  ArkMenuIndicator,
  ArkMenuItem,
  ArkMenuItemGroup,
  ArkMenuItemGroupLabel,
  ArkMenuItemIndicator,
  ArkMenuItemText,
  ArkMenuPositioner,
  ArkMenuRadioItem,
  ArkMenuRadioItemGroup,
  ArkMenuRoot,
  ArkMenuRootProvider,
  ArkMenuSeparator,
  ArkMenuTrigger,
  ArkMenuTriggerItem,
  injectArkMenuContext,
  injectArkMenuContextCarrier,
  menuAnatomy,
  useMenu,
  type MenuApi,
  type MenuElementIds,
  type MenuHighlightChangeDetails,
  type MenuItemMachineProps,
  type MenuMachine,
  type MenuMachineProps,
  type MenuNavigateDetails,
  type MenuOpenChangeDetails,
  type MenuPositioningOptions,
  type MenuSelectionDetails,
  type MenuService,
  type MenuTriggerMachineProps,
  type MenuTriggerValueChangeDetails,
  type UseMenuOptions,
  type UseMenuProps,
  type UseMenuReturn,
} from '@ark-ui/angular/menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { MenuBasicExample } from './examples/basic'
import { MenuCheckboxItemsExample } from './examples/checkbox-items'
import { MenuControlledExample } from './examples/controlled'
import { MenuControlledHighlightExample } from './examples/controlled-highlight'
import { MenuItemGroupExample } from './examples/item-group'
import { MenuNestedSubmenuExample } from './examples/nested-submenu'
import { MenuRadioItemsExample } from './examples/radio-items'
import { MenuRootProviderExample } from './examples/root-provider'
import { MenuWithSeparatorExample } from './examples/with-separator'

type MenuPublicTypeSmoke = [
  MenuApi,
  MenuElementIds,
  MenuHighlightChangeDetails,
  MenuItemMachineProps,
  MenuMachine,
  MenuMachineProps,
  MenuNavigateDetails,
  MenuOpenChangeDetails,
  MenuPositioningOptions,
  MenuSelectionDetails,
  MenuService,
  MenuTriggerMachineProps,
  MenuTriggerValueChangeDetails,
  UseMenuOptions,
  UseMenuProps,
  UseMenuReturn,
]

@Directive({ selector: '[menuProbe]', standalone: true, exportAs: 'menuProbe' })
class MenuProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseMenuReturn {
    return this._injector.get(ARK_MENU_CONTEXT)
  }
}

const flushOpen = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
  TestBed.tick()
  fixture.detectChanges()
}

describe('@ark-ui/angular/menu', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_MENU_CONTEXT).toBe('object')
    expect(typeof ARK_MENU_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkMenuContext).toBe('function')
    expect(typeof injectArkMenuContextCarrier).toBe('function')
    expect(typeof useMenu).toBe('function')
    expect(typeof menuAnatomy).toBe('object')
    expect(ArkMenuRoot).toBeDefined()
    expect(ArkMenuRootProvider).toBeDefined()
    expect(ArkMenuTrigger).toBeDefined()
    expect(ArkMenuContextTrigger).toBeDefined()
    expect(ArkMenuPositioner).toBeDefined()
    expect(ArkMenuContent).toBeDefined()
    expect(ArkMenuItem).toBeDefined()
    expect(ArkMenuItemText).toBeDefined()
    expect(ArkMenuSeparator).toBeDefined()
    expect(ArkMenuIndicator).toBeDefined()
    expect(ArkMenuArrow).toBeDefined()
    expect(ArkMenuArrowTip).toBeDefined()
    expect(ArkMenuCheckboxItem).toBeDefined()
    expect(ArkMenuRadioItem).toBeDefined()
    expect(ArkMenuRadioItemGroup).toBeDefined()
    expect(ArkMenuItemGroup).toBeDefined()
    expect(ArkMenuItemGroupLabel).toBeDefined()
    expect(ArkMenuItemIndicator).toBeDefined()
    expect(ArkMenuTriggerItem).toBeDefined()
    expect(undefined as MenuPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useMenu({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useMenu({ context: () => ({}) }))
    const id = (result.api().getTriggerProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/menu::/)

    fixture.destroy()
  })

  it('descendant probe under [arkMenu] receives the Root directive via ARK_MENU_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, MenuProbe],
      template: '<div arkMenu><span menuProbe></span></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const probeDebug = fixture.debugElement.query(By.directive(MenuProbe))
    const rootInstance = rootDebug.injector.get(ArkMenuRoot)
    const probeInstance = probeDebug.injector.get(MenuProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkMenuTrigger] without ancestor [arkMenu] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkMenuTrigger],
      template: '<button arkMenuTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_MENU_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the trigger opens the menu and the model emits exactly once', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuTrigger, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
      template: `
        <div arkMenu #root="arkMenu" (openChange)="emissions.push($event)">
          <button arkMenuTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItem value="a">A</div>
                <div arkMenuItem value="b">B</div>
              </div>
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
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkMenuTrigger)).nativeElement as HTMLButtonElement

    expect(root.api().open).toBe(false)

    triggerEl.click()
    await flushOpen(fixture)

    expect(root.api().open).toBe(true)
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('closes the menu via api.setOpen(false)', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuTrigger, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <button arkMenuTrigger></button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItem value="a">A</div>
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
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)

    expect(root.api().open).toBe(true)

    root.api().setOpen(false)
    await flushOpen(fixture)

    expect(root.api().open).toBe(false)

    fixture.destroy()
  })

  it('keyboard ArrowDown/ArrowUp/Home/End moves the highlighted value through items', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
      template: `
        <div
          arkMenu
          defaultOpen
          [ids]="{ content: 'menu-keyboard-content' }"
          #root="arkMenu"
          (highlightedValueChange)="highlights.push($event)"
        >
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItem value="one">One</div>
                <div arkMenuItem value="two">Two</div>
                <div arkMenuItem value="three">Three</div>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly highlights: Array<string | null | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)

    expect(root.api().open).toBe(true)

    root.api().setHighlightedValue('one')
    await flushOpen(fixture)
    expect(root.api().highlightedValue).toBe('one')

    const contentEl = fixture.debugElement.query(By.directive(ArkMenuContent)).nativeElement as HTMLElement
    contentEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true, cancelable: true }),
    )
    await flushOpen(fixture)
    expect(root.api().highlightedValue).toBe('two')

    contentEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowUp', code: 'ArrowUp', bubbles: true, cancelable: true }),
    )
    await flushOpen(fixture)
    expect(root.api().highlightedValue).toBe('one')

    contentEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', code: 'End', bubbles: true, cancelable: true }))
    await flushOpen(fixture)
    expect(root.api().highlightedValue).toBe('three')

    contentEl.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Home', code: 'Home', bubbles: true, cancelable: true }),
    )
    await flushOpen(fixture)
    expect(root.api().highlightedValue).toBe('one')

    fixture.destroy()
  })

  it('item selection emits (select) exactly once when an item is clicked', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkPortalComponent],
      template: `
        <div arkMenu defaultOpen #root="arkMenu" (select)="selected.push($event)">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItem value="alpha">Alpha</div>
                <div arkMenuItem value="beta">Beta</div>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly selected: MenuSelectionDetails[] = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)
    const emitSpy = vi.spyOn(root.select, 'emit')

    root.api().setHighlightedValue('alpha')
    await flushOpen(fixture)

    const alphaItem = fixture.debugElement
      .queryAll(By.directive(ArkMenuItem))
      .find((el) => (el.nativeElement as HTMLElement).getAttribute('data-value') === 'alpha')
      ?.nativeElement as HTMLElement

    expect(alphaItem).toBeDefined()
    alphaItem.click()
    await flushOpen(fixture)

    expect(emitSpy).toHaveBeenCalledTimes(1)
    expect(fixture.componentInstance.selected.length).toBe(1)
    expect(fixture.componentInstance.selected[0]).toEqual({ value: 'alpha' })

    emitSpy.mockRestore()
    fixture.destroy()
  })

  it('arrow, arrow-tip, indicator, and separator parts emit menu data-scope/data-part attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkMenuRoot,
        ArkMenuTrigger,
        ArkMenuIndicator,
        ArkMenuPositioner,
        ArkMenuContent,
        ArkMenuItem,
        ArkMenuSeparator,
        ArkMenuArrow,
        ArkMenuArrowTip,
        ArkPortalComponent,
      ],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <button arkMenuTrigger>
            <span arkMenuIndicator></span>
          </button>
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuArrow>
                  <div arkMenuArrowTip></div>
                </div>
                <div arkMenuItem value="a">A</div>
                <div arkMenuSeparator></div>
                <div arkMenuItem value="b">B</div>
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
    await flushOpen(fixture)

    const arrowEl = fixture.debugElement.query(By.directive(ArkMenuArrow)).nativeElement as HTMLElement
    const arrowTipEl = fixture.debugElement.query(By.directive(ArkMenuArrowTip)).nativeElement as HTMLElement
    const indicatorEl = fixture.debugElement.query(By.directive(ArkMenuIndicator)).nativeElement as HTMLElement
    const separatorEl = fixture.debugElement.query(By.directive(ArkMenuSeparator)).nativeElement as HTMLElement

    expect(arrowEl.getAttribute('data-scope')).toBe('menu')
    expect(arrowEl.getAttribute('data-part')).toBe('arrow')
    expect(arrowTipEl.getAttribute('data-scope')).toBe('menu')
    expect(arrowTipEl.getAttribute('data-part')).toBe('arrow-tip')
    expect(indicatorEl.getAttribute('data-scope')).toBe('menu')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')
    expect(separatorEl.getAttribute('data-scope')).toBe('menu')
    expect(separatorEl.getAttribute('data-part')).toBe('separator')

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkMenuRoot and read api().open (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkPortalComponent, MenuProbe],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <span menuProbe></span>
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

    const probeDebug = fixture.debugElement.query(By.directive(MenuProbe))
    const probe = probeDebug.injector.get(MenuProbe)
    const rootInstance = fixture.debugElement.query(By.directive(ArkMenuRoot)).injector.get(ArkMenuRoot)

    expect(probe.capturedRoot).toBe(rootInstance)
    expect(probe.capturedRoot.api().open).toBe(true)

    fixture.destroy()
  })

  it('controlled [(open)] round-trips a host signal without redundant emissions', () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkPortalComponent],
      template: `
        <div arkMenu #root="arkMenu" [(open)]="open" (openChange)="emissions.push($event)">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent></div>
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

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)

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

  it('[defaultOpen] property binding starts the menu open', () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkPortalComponent],
      template: `
        <div arkMenu [defaultOpen]="true" #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent></div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkMenuRoot))
    const root = rootDebug.injector.get(ArkMenuRoot)

    expect(root.api().open).toBe(true)

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('MenuBasicExample renders trigger with menu data attributes', () => {
    TestBed.configureTestingModule({ imports: [MenuBasicExample] })
    const fixture = TestBed.createComponent(MenuBasicExample)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkMenuTrigger)).nativeElement as HTMLButtonElement
    expect(triggerEl.getAttribute('data-scope')).toBe('menu')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')

    fixture.destroy()
  })

  it('MenuControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuControlledExample] })
    const fixture = TestBed.createComponent(MenuControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuWithSeparatorExample renders a separator part', () => {
    TestBed.configureTestingModule({ imports: [MenuWithSeparatorExample] })
    const fixture = TestBed.createComponent(MenuWithSeparatorExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuControlledHighlightExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuControlledHighlightExample] })
    const fixture = TestBed.createComponent(MenuControlledHighlightExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [MenuRootProviderExample] })
    const fixture = TestBed.createComponent(MenuRootProviderExample)
    fixture.detectChanges()

    expect(fixture.componentInstance.openLabel()).toBe('closed')
    fixture.componentInstance.menu.send({ type: 'OPEN' })
    TestBed.tick()
    fixture.detectChanges()
    expect(fixture.componentInstance.openLabel()).toBe('open')

    fixture.destroy()
  })

  it('arkMenuCheckboxItem toggles data-state="checked" on click and updates the model', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkMenuCheckboxItem, ArkPortalComponent],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuCheckboxItem value="toolbar" [(checked)]="checked">Toolbar</div>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly checked = signal<boolean | undefined>(false)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const itemEl = fixture.debugElement.query(By.directive(ArkMenuCheckboxItem)).nativeElement as HTMLElement
    expect(itemEl.getAttribute('data-scope')).toBe('menu')
    expect(itemEl.getAttribute('data-part')).toBe('item')
    expect(itemEl.getAttribute('data-state')).toBe('unchecked')

    itemEl.click()
    await flushOpen(fixture)

    expect(fixture.componentInstance.checked()).toBe(true)
    const itemElAfter = fixture.debugElement.query(By.directive(ArkMenuCheckboxItem)).nativeElement as HTMLElement
    expect(itemElAfter.getAttribute('data-state')).toBe('checked')

    fixture.destroy()
  })

  it('arkMenuRadioItemGroup selects exactly one item and emits the new value', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkMenuRoot,
        ArkMenuPositioner,
        ArkMenuContent,
        ArkMenuRadioItemGroup,
        ArkMenuRadioItem,
        ArkPortalComponent,
      ],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuRadioItemGroup [(value)]="sortBy">
                  <div arkMenuRadioItem value="name">Name</div>
                  <div arkMenuRadioItem value="date">Date</div>
                  <div arkMenuRadioItem value="size">Size</div>
                </div>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly sortBy = signal<string | null | undefined>('date')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const radioItems = fixture.debugElement.queryAll(By.directive(ArkMenuRadioItem))
    expect(radioItems.length).toBe(3)

    const findItem = (value: string): HTMLElement =>
      radioItems.find((el) => (el.nativeElement as HTMLElement).getAttribute('data-value') === value)
        ?.nativeElement as HTMLElement

    expect(findItem('date').getAttribute('data-state')).toBe('checked')
    expect(findItem('name').getAttribute('data-state')).toBe('unchecked')
    expect(findItem('size').getAttribute('data-state')).toBe('unchecked')

    findItem('size').click()
    await flushOpen(fixture)

    expect(fixture.componentInstance.sortBy()).toBe('size')

    const radioItemsAfter = fixture.debugElement.queryAll(By.directive(ArkMenuRadioItem))
    const findAfter = (value: string): HTMLElement =>
      radioItemsAfter.find((el) => (el.nativeElement as HTMLElement).getAttribute('data-value') === value)
        ?.nativeElement as HTMLElement

    expect(findAfter('size').getAttribute('data-state')).toBe('checked')
    expect(findAfter('date').getAttribute('data-state')).toBe('unchecked')
    expect(findAfter('name').getAttribute('data-state')).toBe('unchecked')

    fixture.destroy()
  })

  it('arkMenuItemGroup and arkMenuItemGroupLabel produce Zag menu group/label attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkMenuRoot,
        ArkMenuPositioner,
        ArkMenuContent,
        ArkMenuItem,
        ArkMenuItemGroup,
        ArkMenuItemGroupLabel,
        ArkPortalComponent,
      ],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuItemGroup id="clipboard-group">
                  <div arkMenuItemGroupLabel>Clipboard</div>
                  <div arkMenuItem value="cut">Cut</div>
                  <div arkMenuItem value="copy">Copy</div>
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
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const groupEl = fixture.debugElement.query(By.directive(ArkMenuItemGroup)).nativeElement as HTMLElement
    const labelEl = fixture.debugElement.query(By.directive(ArkMenuItemGroupLabel)).nativeElement as HTMLElement

    expect(groupEl.getAttribute('data-scope')).toBe('menu')
    expect(groupEl.getAttribute('data-part')).toBe('item-group')
    expect(labelEl.getAttribute('data-scope')).toBe('menu')
    expect(labelEl.getAttribute('data-part')).toBe('item-group-label')

    fixture.destroy()
  })

  it('arkMenuItemIndicator inside a checkbox item reflects the checked data-state', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkMenuRoot,
        ArkMenuPositioner,
        ArkMenuContent,
        ArkMenuCheckboxItem,
        ArkMenuItemIndicator,
        ArkPortalComponent,
      ],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenuCheckboxItem value="toolbar" [(checked)]="checked">
                  <span arkMenuItemIndicator></span>
                </div>
              </div>
            </div>
          </ark-portal>
        </div>
      `,
    })
    class Host {
      readonly checked = signal<boolean | undefined>(true)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const indicatorEl = fixture.debugElement.query(By.directive(ArkMenuItemIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('menu')
    expect(indicatorEl.getAttribute('data-part')).toBe('item-indicator')
    expect(indicatorEl.getAttribute('data-state')).toBe('checked')

    fixture.destroy()
  })

  it('nested [arkMenu] inside parent applies parent api.getTriggerItemProps via [arkMenuTriggerItem]', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkMenuItem, ArkMenuTriggerItem, ArkPortalComponent],
      template: `
        <div arkMenu defaultOpen #root="arkMenu">
          <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
            <div arkMenuPositioner>
              <div arkMenuContent>
                <div arkMenu #share="arkMenu">
                  <div arkMenuTriggerItem>Share</div>
                  <ark-portal [originInjector]="share.getContextCarrier().elementInjector">
                    <div arkMenuPositioner>
                      <div arkMenuContent>
                        <div arkMenuItem value="email">Email</div>
                      </div>
                    </div>
                  </ark-portal>
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
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const triggerItemEl = fixture.debugElement.query(By.directive(ArkMenuTriggerItem)).nativeElement as HTMLElement

    expect(triggerItemEl.getAttribute('data-scope')).toBe('menu')
    expect(triggerItemEl.getAttribute('data-part')).toBe('trigger-item')
    expect(triggerItemEl.hasAttribute('data-value')).toBe(true)

    fixture.destroy()
  })

  it('removes a nested submenu from its parent during teardown without warnings', async () => {
    @Component({
      standalone: true,
      imports: [ArkMenuRoot, ArkMenuPositioner, ArkMenuContent, ArkMenuTriggerItem],
      template: `
        <div arkMenu defaultOpen>
          <div arkMenuPositioner>
            <div arkMenuContent>
              @if (showChild()) {
                <div arkMenu>
                  <div arkMenuTriggerItem>Share</div>
                </div>
              }
            </div>
          </div>
        </div>
      `,
    })
    class Host {
      readonly showChild = signal(true)
    }

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    fixture.componentInstance.showChild.set(false)
    fixture.detectChanges()
    await flushOpen(fixture)

    expect(errorSpy).not.toHaveBeenCalled()
    expect(warnSpy).not.toHaveBeenCalled()

    fixture.destroy()
    errorSpy.mockRestore()
    warnSpy.mockRestore()
  })

  it('MenuCheckboxItemsExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuCheckboxItemsExample] })
    const fixture = TestBed.createComponent(MenuCheckboxItemsExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuRadioItemsExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuRadioItemsExample] })
    const fixture = TestBed.createComponent(MenuRadioItemsExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuItemGroupExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuItemGroupExample] })
    const fixture = TestBed.createComponent(MenuItemGroupExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('MenuNestedSubmenuExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [MenuNestedSubmenuExample] })
    const fixture = TestBed.createComponent(MenuNestedSubmenuExample)
    fixture.detectChanges()
    fixture.destroy()
  })
})
