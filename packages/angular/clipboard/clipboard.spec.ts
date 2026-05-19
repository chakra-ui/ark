import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_CLIPBOARD_CONTEXT,
  ArkClipboardControl,
  ArkClipboardIndicator,
  ArkClipboardInput,
  ArkClipboardLabel,
  ArkClipboardRoot,
  ArkClipboardRootProvider,
  ArkClipboardTrigger,
  ArkClipboardValueText,
  clipboardAnatomy,
  injectArkClipboardContext,
  useClipboard,
  type ClipboardApi,
  type ClipboardCopyStatusDetails,
  type ClipboardElementIds,
  type ClipboardIndicatorProps,
  type ClipboardIntlTranslations,
  type ClipboardMachine,
  type ClipboardMachineProps,
  type ClipboardService,
  type ClipboardValueChangeDetails,
  type UseClipboardOptions,
  type UseClipboardProps,
  type UseClipboardReturn,
} from '@ark-ui/angular/clipboard'
import { ClipboardBasicExample } from './examples/basic'
import { ClipboardControlledExample } from './examples/controlled'
import { ClipboardRootProviderExample } from './examples/root-provider'
import { ClipboardWithTriggerExample } from './examples/with-trigger'

type ClipboardPublicTypeSmoke = [
  ClipboardApi,
  ClipboardCopyStatusDetails,
  ClipboardElementIds,
  ClipboardIndicatorProps,
  ClipboardIntlTranslations,
  ClipboardMachine,
  ClipboardMachineProps,
  ClipboardService,
  ClipboardValueChangeDetails,
  UseClipboardOptions,
  UseClipboardProps,
  UseClipboardReturn,
]

const installClipboardMock = () => {
  const writeText = vi.fn(async () => undefined)
  Object.defineProperty(globalThis.navigator, 'clipboard', {
    configurable: true,
    value: { writeText },
  })
  return writeText
}

const uninstallClipboardMock = () => {
  Reflect.deleteProperty(globalThis.navigator as object, 'clipboard')
}

const flushCopy = async () => {
  await new Promise<void>((resolve) => setTimeout(resolve, 0))
  TestBed.tick()
}

describe('@ark-ui/angular/clipboard', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    uninstallClipboardMock()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_CLIPBOARD_CONTEXT).toBe('object')
    expect(typeof injectArkClipboardContext).toBe('function')
    expect(typeof useClipboard).toBe('function')
    expect(typeof clipboardAnatomy).toBe('object')
    expect(ArkClipboardRoot).toBeDefined()
    expect(ArkClipboardRootProvider).toBeDefined()
    expect(ArkClipboardLabel).toBeDefined()
    expect(ArkClipboardControl).toBeDefined()
    expect(ArkClipboardInput).toBeDefined()
    expect(ArkClipboardTrigger).toBeDefined()
    expect(ArkClipboardIndicator).toBeDefined()
    expect(ArkClipboardValueText).toBeDefined()
    expect(undefined as ClipboardPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('input directive reflects value and is read-only', () => {
    installClipboardMock()

    @Component({
      standalone: true,
      imports: [ArkClipboardRoot, ArkClipboardInput],
      template: '<div arkClipboard value="https://ark-ui.com"><input arkClipboardInput /></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkClipboardInput)).nativeElement as HTMLInputElement
    expect(inputEl.getAttribute('data-scope')).toBe('clipboard')
    expect(inputEl.getAttribute('data-part')).toBe('input')
    expect(inputEl.readOnly).toBe(true)
    expect(inputEl.value).toBe('https://ark-ui.com')

    fixture.destroy()
  })

  it('clicking the trigger calls navigator.clipboard.writeText with the value', async () => {
    const writeText = installClipboardMock()

    @Component({
      standalone: true,
      imports: [ArkClipboardRoot, ArkClipboardTrigger],
      template: '<div arkClipboard value="hello world"><button arkClipboardTrigger>Copy</button></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const triggerEl = fixture.debugElement.query(By.directive(ArkClipboardTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    await flushCopy()
    fixture.detectChanges()

    expect(writeText).toHaveBeenCalledTimes(1)
    expect(writeText).toHaveBeenCalledWith('hello world')

    fixture.destroy()
  })

  it('copied indicator state toggles after a copy', async () => {
    installClipboardMock()

    @Component({
      standalone: true,
      imports: [ArkClipboardRoot, ArkClipboardTrigger, ArkClipboardIndicator],
      template: `
        <div arkClipboard value="x">
          <button arkClipboardTrigger>
            <span arkClipboardIndicator>Copy</span>
          </button>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indicatorEl = fixture.debugElement.query(By.directive(ArkClipboardIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('clipboard')
    expect(indicatorEl.getAttribute('data-part')).toBe('indicator')

    const rootDebug = fixture.debugElement.query(By.directive(ArkClipboardRoot))
    const root = rootDebug.injector.get(ArkClipboardRoot)
    expect(root.api().copied).toBe(false)
    const rootEl = rootDebug.nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-copied')).toBeNull()

    const triggerEl = fixture.debugElement.query(By.directive(ArkClipboardTrigger)).nativeElement as HTMLButtonElement
    triggerEl.click()
    await flushCopy()
    fixture.detectChanges()

    expect(root.api().copied).toBe(true)
    expect(rootEl.getAttribute('data-copied')).toBe('')
    expect(triggerEl.getAttribute('data-copied')).toBe('')

    fixture.destroy()
  })

  it('value-text directive exposes the current clipboard value', () => {
    installClipboardMock()

    @Component({
      standalone: true,
      imports: [ArkClipboardRoot, ArkClipboardValueText],
      template: `
        <div arkClipboard value="hello">
          <span arkClipboardValueText #vt="arkClipboardValueText">{{ vt.value() }}</span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const valueTextEl = fixture.debugElement.query(By.directive(ArkClipboardValueText)).nativeElement as HTMLElement
    expect(valueTextEl.textContent?.trim()).toBe('hello')

    fixture.destroy()
  })

  it('SSR-safe: constructing the root without navigator.clipboard does not throw', () => {
    uninstallClipboardMock()
    expect((globalThis.navigator as { clipboard?: unknown }).clipboard).toBeUndefined()

    @Component({
      standalone: true,
      imports: [ArkClipboardRoot],
      template: '<div arkClipboard value="x"></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).not.toThrow()

    fixture.destroy()
  })

  it('public-api source does not import @angular/forms', () => {
    const here = dirname(fileURLToPath(import.meta.url))
    const files = [
      'public-api.ts',
      'clipboard-root.ts',
      'clipboard-root-provider.ts',
      'clipboard-label.ts',
      'clipboard-control.ts',
      'clipboard-input.ts',
      'clipboard-trigger.ts',
      'clipboard-indicator.ts',
      'clipboard-value-text.ts',
      'use-clipboard.ts',
      'use-clipboard-context.ts',
      'clipboard.types.ts',
      'clipboard.anatomy.ts',
    ]
    for (const file of files) {
      const source = readFileSync(join(here, file), 'utf-8')
      expect(source).not.toMatch(/@angular\/forms/)
    }
  })

  it('orphan [arkClipboardTrigger] without ancestor throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkClipboardTrigger],
      template: '<button arkClipboardTrigger></button>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_CLIPBOARD_CONTEXT|No provider|NG0201/i)
  })

  it('ClipboardBasicExample renders root, label, control, input, trigger and indicator', () => {
    installClipboardMock()

    TestBed.configureTestingModule({ imports: [ClipboardBasicExample] })
    const fixture = TestBed.createComponent(ClipboardBasicExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkClipboardRoot)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('clipboard')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    expect(fixture.debugElement.query(By.directive(ArkClipboardLabel))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardControl))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardInput))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardTrigger))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardIndicator))).toBeTruthy()

    fixture.destroy()
  })

  it('ClipboardWithTriggerExample renders trigger and indicator under root', () => {
    installClipboardMock()
    TestBed.configureTestingModule({ imports: [ClipboardWithTriggerExample] })
    const fixture = TestBed.createComponent(ClipboardWithTriggerExample)
    fixture.detectChanges()

    expect(fixture.debugElement.query(By.directive(ArkClipboardRoot))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardTrigger))).toBeTruthy()
    expect(fixture.debugElement.query(By.directive(ArkClipboardIndicator))).toBeTruthy()

    fixture.destroy()
  })

  it('ClipboardControlledExample two-way binds [(value)] to a host signal', () => {
    installClipboardMock()
    TestBed.configureTestingModule({ imports: [ClipboardControlledExample] })
    const fixture = TestBed.createComponent(ClipboardControlledExample)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkClipboardRoot)).injector.get(ArkClipboardRoot)
    expect(root.api().value).toBe('https://ark-ui.com')

    fixture.componentInstance.url.set('https://chakra-ui.com')
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().value).toBe('https://chakra-ui.com')

    fixture.destroy()
  })

  it('ClipboardRootProviderExample wires a useClipboard() instance via [value]', () => {
    installClipboardMock()
    TestBed.configureTestingModule({ imports: [ClipboardRootProviderExample] })
    const fixture = TestBed.createComponent(ClipboardRootProviderExample)
    fixture.detectChanges()

    const provider = fixture.debugElement
      .query(By.directive(ArkClipboardRootProvider))
      .injector.get(ArkClipboardRootProvider)
    expect(provider.resolveValue()).toBe(fixture.componentInstance.clipboard)
    expect(provider.api().value).toBe('https://ark-ui.com')

    fixture.destroy()
  })
})
