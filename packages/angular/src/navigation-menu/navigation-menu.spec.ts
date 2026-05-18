import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ApplicationRef, Component, Directive, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_NAVIGATION_MENU_CONTEXT,
  ARK_NAVIGATION_MENU_CONTEXT_CARRIER,
  ArkNavigationMenuArrow,
  ArkNavigationMenuContent,
  ArkNavigationMenuIndicator,
  ArkNavigationMenuItem,
  ArkNavigationMenuItemIndicator,
  ArkNavigationMenuLink,
  ArkNavigationMenuList,
  ArkNavigationMenuRoot,
  ArkNavigationMenuRootProvider,
  ArkNavigationMenuTrigger,
  ArkNavigationMenuViewport,
  ArkNavigationMenuViewportPositioner,
  injectArkNavigationMenuContext,
  navigationMenuAnatomy,
  useNavigationMenu,
  type NavigationMenuApi,
  type NavigationMenuElementIds,
  type NavigationMenuMachine,
  type NavigationMenuMachineProps,
  type NavigationMenuService,
  type NavigationMenuValueChangeDetails,
  type UseNavigationMenuOptions,
  type UseNavigationMenuProps,
  type UseNavigationMenuReturn,
} from '@ark-ui/angular/navigation-menu'
import { ArkPortalComponent } from '@ark-ui/angular/portal'
import { NavigationMenuBasicExample } from './examples/basic'
import { NavigationMenuControlledExample } from './examples/controlled'
import { NavigationMenuRootProviderExample } from './examples/root-provider'
import { NavigationMenuViewportExample } from './examples/viewport'
import { NavigationMenuWithIndicatorExample } from './examples/with-indicator'

type NavigationMenuPublicTypeSmoke = [
  NavigationMenuApi,
  NavigationMenuElementIds,
  NavigationMenuMachine,
  NavigationMenuMachineProps,
  NavigationMenuService,
  NavigationMenuValueChangeDetails,
  UseNavigationMenuOptions,
  UseNavigationMenuProps,
  UseNavigationMenuReturn,
]

@Directive({ selector: '[navigationMenuProbe]', standalone: true, exportAs: 'navigationMenuProbe' })
class NavigationMenuProbe {
  private readonly _injector = inject(Injector)
  get capturedRoot(): UseNavigationMenuReturn {
    return this._injector.get(ARK_NAVIGATION_MENU_CONTEXT)
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

describe('@ark-ui/angular/navigation-menu', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_NAVIGATION_MENU_CONTEXT).toBe('object')
    expect(typeof ARK_NAVIGATION_MENU_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkNavigationMenuContext).toBe('function')
    expect(typeof useNavigationMenu).toBe('function')
    expect(typeof navigationMenuAnatomy).toBe('object')
    expect(ArkNavigationMenuRoot).toBeDefined()
    expect(ArkNavigationMenuRootProvider).toBeDefined()
    expect(ArkNavigationMenuList).toBeDefined()
    expect(ArkNavigationMenuItem).toBeDefined()
    expect(ArkNavigationMenuTrigger).toBeDefined()
    expect(ArkNavigationMenuContent).toBeDefined()
    expect(ArkNavigationMenuLink).toBeDefined()
    expect(ArkNavigationMenuIndicator).toBeDefined()
    expect(ArkNavigationMenuItemIndicator).toBeDefined()
    expect(ArkNavigationMenuViewport).toBeDefined()
    expect(ArkNavigationMenuViewportPositioner).toBeDefined()
    expect(ArkNavigationMenuArrow).toBeDefined()
    expect(undefined as NavigationMenuPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useNavigationMenu({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useNavigationMenu({ context: () => ({}) }))
    const id = (result.api().getListProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/navigation-menu::/)

    fixture.destroy()
  })

  it('descendant probe under [arkNavigationMenu] receives the Root directive via ARK_NAVIGATION_MENU_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkNavigationMenuRoot, NavigationMenuProbe],
      template: '<nav arkNavigationMenu><span navigationMenuProbe></span></nav>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkNavigationMenuRoot))
    const probeDebug = fixture.debugElement.query(By.directive(NavigationMenuProbe))
    const rootInstance = rootDebug.injector.get(ArkNavigationMenuRoot)
    const probeInstance = probeDebug.injector.get(NavigationMenuProbe)

    expect(probeInstance.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('orphan [arkNavigationMenuTrigger] without ancestor [arkNavigationMenu] throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkNavigationMenuTrigger],
      template: '<button arkNavigationMenuTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_NAVIGATION_MENU|No provider|NG0201/i)
  })

  it('list/item/link directives apply Zag prop bags (data-scope/data-part attributes)', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuContent,
        ArkNavigationMenuLink,
      ],
      template: `
        <nav arkNavigationMenu>
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
              <div arkNavigationMenuContent>
                <a arkNavigationMenuLink href="#overview">Overview</a>
              </div>
            </div>
          </div>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    const listEl = fixture.debugElement.query(By.directive(ArkNavigationMenuList)).nativeElement as HTMLElement
    const itemEl = fixture.debugElement.query(By.directive(ArkNavigationMenuItem)).nativeElement as HTMLElement
    const triggerEl = fixture.debugElement.query(By.directive(ArkNavigationMenuTrigger))
      .nativeElement as HTMLButtonElement
    const linkEl = fixture.debugElement.query(By.directive(ArkNavigationMenuLink)).nativeElement as HTMLElement

    expect(listEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(listEl.getAttribute('data-part')).toBe('list')
    expect(itemEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(itemEl.getAttribute('data-part')).toBe('item')
    expect(triggerEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(triggerEl.getAttribute('data-part')).toBe('trigger')
    expect(linkEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(linkEl.getAttribute('data-part')).toBe('link')

    fixture.destroy()
  })

  it('clicking a trigger opens that item content (api.value tracks item value)', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuContent,
      ],
      template: `
        <nav arkNavigationMenu #root="arkNavigationMenu" (valueChange)="emissions.push($event)">
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
              <div arkNavigationMenuContent></div>
            </div>
          </div>
        </nav>
      `,
    })
    class Host {
      readonly emissions: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkNavigationMenuRoot))
    const root = rootDebug.injector.get(ArkNavigationMenuRoot)
    const triggerEl = fixture.debugElement.query(By.directive(ArkNavigationMenuTrigger))
      .nativeElement as HTMLButtonElement

    expect(root.api().value == null || root.api().value === '').toBe(true)

    triggerEl.click()
    await flushOpen(fixture)

    expect(root.api().value).toBe('features')
    expect(fixture.componentInstance.emissions).toContain('features')
    expect('valueChange' in root).toBe(false)

    fixture.destroy()
  })

  it('indicator and arrow parts emit navigation-menu data-scope/data-part attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuContent,
        ArkNavigationMenuIndicator,
        ArkNavigationMenuArrow,
      ],
      template: `
        <nav arkNavigationMenu>
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
              <div arkNavigationMenuContent></div>
            </div>
            <span arkNavigationMenuIndicator>
              <span arkNavigationMenuArrow></span>
            </span>
          </div>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    const indicatorEl = fixture.debugElement.query(By.directive(ArkNavigationMenuIndicator))
      .nativeElement as HTMLElement
    const arrowEl = fixture.debugElement.query(By.directive(ArkNavigationMenuArrow)).nativeElement as HTMLElement

    expect(indicatorEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')
    expect(arrowEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(arrowEl.getAttribute('data-part')).toBe('arrow')

    fixture.destroy()
  })

  it('item-indicator inside an item applies Zag item-indicator attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuItemIndicator,
      ],
      template: `
        <nav arkNavigationMenu>
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>
                Features
                <span arkNavigationMenuItemIndicator></span>
              </button>
            </div>
          </div>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    const itemIndicatorEl = fixture.debugElement.query(By.directive(ArkNavigationMenuItemIndicator))
      .nativeElement as HTMLElement
    expect(itemIndicatorEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(itemIndicatorEl.getAttribute('data-part')).toBe('item-indicator')

    fixture.destroy()
  })

  it('viewport-positioner and viewport apply Zag viewport attributes', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuViewport,
        ArkNavigationMenuViewportPositioner,
      ],
      template: `
        <nav arkNavigationMenu>
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
            </div>
          </div>
          <div arkNavigationMenuViewportPositioner align="start">
            <div arkNavigationMenuViewport></div>
          </div>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    const positionerEl = fixture.debugElement.query(By.directive(ArkNavigationMenuViewportPositioner))
      .nativeElement as HTMLElement
    const viewportEl = fixture.debugElement.query(By.directive(ArkNavigationMenuViewport)).nativeElement as HTMLElement

    expect(positionerEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(positionerEl.getAttribute('data-part')).toBe('viewport-positioner')
    expect(viewportEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(viewportEl.getAttribute('data-part')).toBe('viewport')

    fixture.destroy()
  })

  it('controlled [(value)] round-trips a host signal without redundant emissions', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuContent,
      ],
      template: `
        <nav arkNavigationMenu [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
              <div arkNavigationMenuContent></div>
            </div>
          </div>
        </nav>
      `,
    })
    class Host {
      readonly value = signal<string | undefined>('')
      readonly emissions: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushOpen(fixture)

    const rootDebug = fixture.debugElement.query(By.directive(ArkNavigationMenuRoot))
    const root = rootDebug.injector.get(ArkNavigationMenuRoot)

    fixture.componentInstance.value.set('features')
    TestBed.tick()
    fixture.detectChanges()
    await flushOpen(fixture)

    expect(root.api().value).toBe('features')
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.value.set('features')
    TestBed.tick()
    fixture.detectChanges()
    await flushOpen(fixture)

    expect(root.api().value).toBe('features')
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('content rendered through ark-portal can inject ArkNavigationMenuRoot (AC 24)', async () => {
    @Component({
      standalone: true,
      imports: [
        ArkNavigationMenuRoot,
        ArkNavigationMenuList,
        ArkNavigationMenuItem,
        ArkNavigationMenuTrigger,
        ArkNavigationMenuContent,
        ArkPortalComponent,
        NavigationMenuProbe,
      ],
      template: `
        <nav arkNavigationMenu #root="arkNavigationMenu">
          <div arkNavigationMenuList>
            <div arkNavigationMenuItem value="features">
              <button type="button" arkNavigationMenuTrigger>Features</button>
              <ark-portal [originInjector]="root.getContextCarrier().elementInjector">
                <div arkNavigationMenuContent>
                  <span navigationMenuProbe></span>
                </div>
              </ark-portal>
            </div>
          </div>
        </nav>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await TestBed.inject(ApplicationRef).whenStable()
    fixture.detectChanges()

    const probeDebug = fixture.debugElement.query(By.directive(NavigationMenuProbe))
    const probe = probeDebug.injector.get(NavigationMenuProbe)
    const rootInstance = fixture.debugElement
      .query(By.directive(ArkNavigationMenuRoot))
      .injector.get(ArkNavigationMenuRoot)

    expect(probe.capturedRoot).toBe(rootInstance)

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('NavigationMenuBasicExample renders list with navigation-menu data attributes', () => {
    TestBed.configureTestingModule({ imports: [NavigationMenuBasicExample] })
    const fixture = TestBed.createComponent(NavigationMenuBasicExample)
    fixture.detectChanges()

    const listEl = fixture.debugElement.query(By.directive(ArkNavigationMenuList)).nativeElement as HTMLElement
    expect(listEl.getAttribute('data-scope')).toBe('navigation-menu')
    expect(listEl.getAttribute('data-part')).toBe('list')

    fixture.destroy()
  })

  it('NavigationMenuControlledExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [NavigationMenuControlledExample] })
    const fixture = TestBed.createComponent(NavigationMenuControlledExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('NavigationMenuRootProviderExample shares state between hook and directives', () => {
    TestBed.configureTestingModule({ imports: [NavigationMenuRootProviderExample] })
    const fixture = TestBed.createComponent(NavigationMenuRootProviderExample)
    fixture.detectChanges()
    expect(fixture.componentInstance.openValue()).toBe('none')
    fixture.destroy()
  })

  it('NavigationMenuViewportExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [NavigationMenuViewportExample] })
    const fixture = TestBed.createComponent(NavigationMenuViewportExample)
    fixture.detectChanges()
    fixture.destroy()
  })

  it('NavigationMenuWithIndicatorExample mounts without throwing', () => {
    TestBed.configureTestingModule({ imports: [NavigationMenuWithIndicatorExample] })
    const fixture = TestBed.createComponent(NavigationMenuWithIndicatorExample)
    fixture.detectChanges()
    fixture.destroy()
  })
})
