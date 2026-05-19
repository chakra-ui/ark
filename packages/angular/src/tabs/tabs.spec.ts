import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { ApplicationRef, Component, Injector, inject, runInInjectionContext, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_TABS_CONTEXT,
  ARK_TABS_CONTEXT_CARRIER,
  ArkTabsContent,
  ArkTabsIndicator,
  ArkTabsList,
  ArkTabsRoot,
  ArkTabsRootProvider,
  ArkTabsTrigger,
  injectArkTabsContext,
  injectArkTabsContextCarrier,
  tabsAnatomy,
  useTabs,
  type TabsApi,
  type TabsContentProps,
  type TabsElementIds,
  type TabsFocusChangeDetails,
  type TabsIntlTranslations,
  type TabsMachine,
  type TabsMachineProps,
  type TabsNavigateDetails,
  type TabsService,
  type TabsTriggerProps,
  type TabsTriggerState,
  type TabsValueChangeDetails,
  type UseTabsOptions,
  type UseTabsProps,
  type UseTabsReturn,
} from '@ark-ui/angular/tabs'
import { TabsBasicExample } from './examples/basic'
import { TabsLinksExample } from './examples/links'
import { TabsRootProviderExample } from './examples/root-provider'

type TabsPublicTypeSmoke = [
  TabsApi,
  TabsContentProps,
  TabsElementIds,
  TabsFocusChangeDetails,
  TabsIntlTranslations,
  TabsMachine,
  TabsMachineProps,
  TabsNavigateDetails,
  TabsService,
  TabsTriggerProps,
  TabsTriggerState,
  TabsValueChangeDetails,
  UseTabsOptions,
  UseTabsProps,
  UseTabsReturn,
]

@Component({
  standalone: true,
  imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
  template: `
    <div arkTabs defaultValue="account">
      <div arkTabsList>
        <button type="button" arkTabsTrigger value="account">Account</button>
        <button type="button" arkTabsTrigger value="password">Password</button>
        <button type="button" arkTabsTrigger value="billing">Billing</button>
      </div>
      <div arkTabsContent value="account">Account content</div>
      <div arkTabsContent value="password">Password content</div>
      <div arkTabsContent value="billing">Billing content</div>
    </div>
  `,
})
class BasicHost {}

const flushTabs = async (fixture: ReturnType<typeof TestBed.createComponent>) => {
  await TestBed.inject(ApplicationRef).whenStable()
  TestBed.tick()
  fixture.detectChanges()
  await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
  TestBed.tick()
  fixture.detectChanges()
}

const keydown = (el: HTMLElement, key: string) => {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
}

const triggers = (fixture: ReturnType<typeof TestBed.createComponent>): HTMLButtonElement[] =>
  fixture.debugElement.queryAll(By.directive(ArkTabsTrigger)).map((debug) => debug.nativeElement as HTMLButtonElement)

const contents = (fixture: ReturnType<typeof TestBed.createComponent>): HTMLElement[] =>
  fixture.debugElement.queryAll(By.directive(ArkTabsContent)).map((debug) => debug.nativeElement as HTMLElement)

describe('@ark-ui/angular/tabs', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_TABS_CONTEXT).toBe('object')
    expect(typeof ARK_TABS_CONTEXT_CARRIER).toBe('object')
    expect(typeof injectArkTabsContext).toBe('function')
    expect(typeof injectArkTabsContextCarrier).toBe('function')
    expect(typeof useTabs).toBe('function')
    expect(typeof tabsAnatomy).toBe('object')
    expect(ArkTabsRoot).toBeDefined()
    expect(ArkTabsRootProvider).toBeDefined()
    expect(ArkTabsList).toBeDefined()
    expect(ArkTabsTrigger).toBeDefined()
    expect(ArkTabsContent).toBeDefined()
    expect(ArkTabsIndicator).toBeDefined()
    expect(undefined as TabsPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('useTabs({ context: () => ({}) }) produces a non-empty fallback id', () => {
    @Component({ standalone: true, template: '' })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    const injector = fixture.componentRef.injector

    const result = runInInjectionContext(injector, () => useTabs({ context: () => ({}) }))
    const id = (result.api().getRootProps() as Record<string, unknown>)['id'] as string

    expect(typeof id).toBe('string')
    expect(id.length).toBeGreaterThan(0)
    expect(id).toMatch(/tabs::/)

    fixture.destroy()
  })

  it('selected content and triggers reflect visibility and selection state', async () => {
    TestBed.configureTestingModule({ imports: [BasicHost] })
    const fixture = TestBed.createComponent(BasicHost)
    fixture.detectChanges()
    await flushTabs(fixture)

    const [accountTrigger, passwordTrigger] = triggers(fixture)
    const [accountContent, passwordContent] = contents(fixture)

    expect(accountTrigger.hasAttribute('data-selected')).toBe(true)
    expect(passwordTrigger.hasAttribute('data-selected')).toBe(false)
    expect(accountContent.hasAttribute('data-selected')).toBe(true)
    expect(accountContent.hasAttribute('hidden')).toBe(false)
    expect(passwordContent.hasAttribute('data-selected')).toBe(false)
    expect(passwordContent.hasAttribute('hidden')).toBe(true)

    fixture.destroy()
  })

  it('clicking selects a trigger and arrow keys move trigger focus', async () => {
    TestBed.configureTestingModule({ imports: [BasicHost] })
    const fixture = TestBed.createComponent(BasicHost)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const listEl = fixture.debugElement.query(By.directive(ArkTabsList)).nativeElement as HTMLElement
    const [accountTrigger, passwordTrigger, billingTrigger] = triggers(fixture)

    expect(root.api().value).toBe('account')

    passwordTrigger.click()
    await flushTabs(fixture)
    expect(root.api().value).toBe('password')

    passwordTrigger.focus()
    await flushTabs(fixture)
    keydown(listEl, 'ArrowRight')
    await flushTabs(fixture)
    expect(root.api().focusedValue).toBe('billing')
    expect(billingTrigger.hasAttribute('data-focus')).toBe(true)

    billingTrigger.focus()
    await flushTabs(fixture)
    keydown(listEl, 'ArrowLeft')
    await flushTabs(fixture)
    expect(root.api().focusedValue).toBe('password')
    expect(accountTrigger.hasAttribute('data-selected')).toBe(false)

    fixture.destroy()
  })

  it('manual activation moves focus without selecting until Enter is pressed', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs defaultValue="account" activationMode="manual">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const listEl = fixture.debugElement.query(By.directive(ArkTabsList)).nativeElement as HTMLElement
    const [accountTrigger, passwordTrigger] = triggers(fixture)

    accountTrigger.focus()
    await flushTabs(fixture)
    keydown(listEl, 'ArrowRight')
    await flushTabs(fixture)

    expect(root.api().value).toBe('account')
    expect(root.api().focusedValue).toBe('password')

    passwordTrigger.click()
    await flushTabs(fixture)

    expect(root.api().focusedValue).toBe('password')

    fixture.destroy()
  })

  it('vertical orientation applies root, list, and trigger orientation attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs defaultValue="account" orientation="vertical">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const rootEl = fixture.debugElement.query(By.directive(ArkTabsRoot)).nativeElement as HTMLElement
    const listEl = fixture.debugElement.query(By.directive(ArkTabsList)).nativeElement as HTMLElement
    const [accountTrigger] = triggers(fixture)

    expect(rootEl.getAttribute('data-orientation')).toBe('vertical')
    expect(listEl.getAttribute('aria-orientation')).toBe('vertical')
    expect(listEl.getAttribute('data-orientation')).toBe('vertical')
    expect(accountTrigger.getAttribute('data-orientation')).toBe('vertical')

    accountTrigger.focus()
    await flushTabs(fixture)
    keydown(listEl, 'ArrowDown')
    await flushTabs(fixture)

    expect(root.api().focusedValue).toBe('password')

    fixture.destroy()
  })

  it('does not loop focus when loopFocus is false', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs [loopFocus]="false">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const listEl = fixture.debugElement.query(By.directive(ArkTabsList)).nativeElement as HTMLElement
    const [, passwordTrigger] = triggers(fixture)

    passwordTrigger.click()
    await flushTabs(fixture)
    expect(root.api().focusedValue).toBe('password')

    keydown(listEl, 'ArrowRight')
    await flushTabs(fixture)
    expect(root.api().focusedValue).toBe('password')

    fixture.destroy()
  })

  it('disabled tabs are marked disabled and cannot be selected', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs defaultValue="account">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password" disabled>Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const [, passwordTrigger] = triggers(fixture)

    expect(passwordTrigger.disabled).toBe(true)
    expect(passwordTrigger.hasAttribute('data-disabled')).toBe(true)

    passwordTrigger.click()
    await flushTabs(fixture)
    expect(root.api().value).toBe('account')

    fixture.destroy()
  })

  it('controlled [(value)] emits once per user-visible selection', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs [(value)]="value" (valueChange)="emissions.push($event)">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {
      readonly value = signal<string | null>('account')
      readonly emissions: Array<string | null> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const [, passwordTrigger] = triggers(fixture)
    passwordTrigger.click()
    await flushTabs(fixture)

    expect(fixture.componentInstance.value()).toBe('password')
    expect(fixture.componentInstance.emissions).toEqual(['password'])

    passwordTrigger.click()
    await flushTabs(fixture)
    expect(fixture.componentInstance.emissions).toEqual(['password'])

    fixture.componentInstance.value.set('password')
    TestBed.tick()
    fixture.detectChanges()
    await flushTabs(fixture)
    expect(fixture.componentInstance.emissions).toEqual(['password'])

    fixture.destroy()
  })

  it('root-provider applies root props and lets descendants consume the provided machine', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRootProvider, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabsRootProvider [value]="tabs">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          <div arkTabsContent value="account">Account content</div>
          <div arkTabsContent value="password">Password content</div>
        </div>
      `,
    })
    class Host {
      readonly tabs: UseTabsReturn = runInInjectionContext(inject(Injector), () =>
        useTabs({ context: () => ({ defaultValue: 'account' }) }),
      )
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkTabsRootProvider)).nativeElement as HTMLElement
    const [, passwordTrigger] = triggers(fixture)

    expect(rootEl.getAttribute('data-scope')).toBe('tabs')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    expect(fixture.componentInstance.tabs.api().value).toBe('account')

    passwordTrigger.click()
    await flushTabs(fixture)
    expect(fixture.componentInstance.tabs.api().value).toBe('password')

    fixture.destroy()
  })

  it('indicator applies tabs data attributes', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent, ArkTabsIndicator],
      template: `
        <div arkTabs defaultValue="account">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <div arkTabsIndicator></div>
          </div>
          <div arkTabsContent value="account">Account content</div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const indicatorEl = fixture.debugElement.query(By.directive(ArkTabsIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('tabs')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')

    fixture.destroy()
  })

  it('lazyMount keeps inactive content unmounted until selected', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs lazyMount defaultValue="account" #tabs="arkTabs">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          @if (!tabs.isContentUnmounted('account')) {
            <div arkTabsContent value="account">Account content</div>
          }
          @if (!tabs.isContentUnmounted('password')) {
            <div arkTabsContent value="password">Password content</div>
          }
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    expect(root.isContentUnmounted('account')).toBe(false)
    expect(root.isContentUnmounted('password')).toBe(true)
    expect(contents(fixture).map((content) => content.textContent?.trim())).toEqual(['Account content'])

    const [, passwordTrigger] = triggers(fixture)
    passwordTrigger.click()
    await flushTabs(fixture)

    expect(root.isContentUnmounted('account')).toBe(false)
    expect(root.isContentUnmounted('password')).toBe(false)
    expect(contents(fixture).map((content) => content.textContent?.trim())).toEqual([
      'Account content',
      'Password content',
    ])

    fixture.destroy()
  })

  it('unmountOnExit removes previously mounted inactive content', async () => {
    @Component({
      standalone: true,
      imports: [ArkTabsRoot, ArkTabsList, ArkTabsTrigger, ArkTabsContent],
      template: `
        <div arkTabs lazyMount unmountOnExit defaultValue="account" #tabs="arkTabs">
          <div arkTabsList>
            <button type="button" arkTabsTrigger value="account">Account</button>
            <button type="button" arkTabsTrigger value="password">Password</button>
          </div>
          @if (!tabs.isContentUnmounted('account')) {
            <div arkTabsContent value="account">Account content</div>
          }
          @if (!tabs.isContentUnmounted('password')) {
            <div arkTabsContent value="password">Password content</div>
          }
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await flushTabs(fixture)

    const root = fixture.debugElement.query(By.directive(ArkTabsRoot)).injector.get(ArkTabsRoot)
    const [, passwordTrigger] = triggers(fixture)

    passwordTrigger.click()
    await flushTabs(fixture)

    expect(root.isContentUnmounted('account')).toBe(true)
    expect(root.isContentUnmounted('password')).toBe(false)
    expect(contents(fixture).map((content) => content.textContent?.trim())).toEqual(['Password content'])

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const source = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'public-api.ts'), 'utf-8')
    expect(source).not.toMatch(/@angular\/forms/)
  })

  it('TabsBasicExample renders a selected tab trigger', async () => {
    TestBed.configureTestingModule({ imports: [TabsBasicExample] })
    const fixture = TestBed.createComponent(TabsBasicExample)
    fixture.detectChanges()
    await flushTabs(fixture)

    const [trigger] = triggers(fixture)
    expect(trigger.getAttribute('data-scope')).toBe('tabs')
    expect(trigger.getAttribute('data-part')).toBe('trigger')
    expect(trigger.hasAttribute('data-selected')).toBe(true)

    fixture.destroy()
  })

  it('TabsRootProviderExample renders with root-provider context', async () => {
    TestBed.configureTestingModule({ imports: [TabsRootProviderExample] })
    const fixture = TestBed.createComponent(TabsRootProviderExample)
    fixture.detectChanges()
    await flushTabs(fixture)

    const rootEl = fixture.debugElement.query(By.directive(ArkTabsRootProvider)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('tabs')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    fixture.destroy()
  })

  it('TabsLinksExample renders anchor triggers with tab semantics', async () => {
    TestBed.configureTestingModule({ imports: [TabsLinksExample] })
    const fixture = TestBed.createComponent(TabsLinksExample)
    fixture.detectChanges()
    await flushTabs(fixture)

    const [accountTrigger] = triggers(fixture)
    expect(accountTrigger.tagName).toBe('A')
    expect(accountTrigger.getAttribute('href')).toBe('#account')
    expect(accountTrigger.getAttribute('role')).toBe('tab')
    expect(accountTrigger.hasAttribute('data-selected')).toBe(true)

    fixture.destroy()
  })
})
