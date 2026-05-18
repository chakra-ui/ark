import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldInput,
  ArkFieldLabel,
  ArkFieldRoot,
} from '@ark-ui/angular/field'
import {
  ARK_FIELDSET_CONTEXT,
  ArkFieldsetErrorText,
  ArkFieldsetHelperText,
  ArkFieldsetLegend,
  ArkFieldsetRoot,
  ArkFieldsetRootProvider,
  fieldsetAnatomy,
  injectArkFieldsetContext,
  injectArkFieldsetContextOptional,
  useFieldset,
  type FieldsetElementIds,
  type FieldsetResolvedIds,
  type UseFieldsetOptions,
  type UseFieldsetProps,
  type UseFieldsetReturn,
} from '@ark-ui/angular/fieldset'
import { FieldsetBasicExample } from './examples/basic'
import { FieldsetDisabledExample } from './examples/disabled'
import { FieldsetInvalidExample } from './examples/invalid'
import { FieldsetRootProviderExample } from './examples/root-provider'
import { FieldsetWithFieldExample } from './examples/with-field'

type FieldsetPublicTypeSmoke = [
  FieldsetElementIds,
  FieldsetResolvedIds,
  UseFieldsetOptions,
  UseFieldsetProps,
  UseFieldsetReturn,
]

describe('@ark-ui/angular/fieldset', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_FIELDSET_CONTEXT).toBe('object')
    expect(typeof injectArkFieldsetContext).toBe('function')
    expect(typeof injectArkFieldsetContextOptional).toBe('function')
    expect(typeof useFieldset).toBe('function')
    expect(typeof fieldsetAnatomy).toBe('object')
    expect(ArkFieldsetRoot).toBeDefined()
    expect(ArkFieldsetRootProvider).toBeDefined()
    expect(ArkFieldsetLegend).toBeDefined()
    expect(ArkFieldsetHelperText).toBeDefined()
    expect(ArkFieldsetErrorText).toBeDefined()
    expect(undefined as FieldsetPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('root provides ARK_FIELDSET_CONTEXT to descendants', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldsetLegend],
      template: '<fieldset arkFieldsetRoot><legend arkFieldsetLegend>Legend</legend></fieldset>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkFieldsetRoot))
    const legendDebug = fixture.debugElement.query(By.directive(ArkFieldsetLegend))
    const rootInstance = rootDebug.injector.get(ArkFieldsetRoot)
    const captured = legendDebug.injector.get(ARK_FIELDSET_CONTEXT)
    expect(captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('an orphan [arkFieldsetLegend] without an ancestor root throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetLegend],
      template: '<legend arkFieldsetLegend></legend>',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_FIELDSET_CONTEXT|No provider|NG0201/i)
  })

  it('disabled and invalid flow as data attrs to root and legend, and aria/disabled to root', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldsetLegend, ArkFieldsetHelperText, ArkFieldsetErrorText],
      template: `
        <fieldset arkFieldsetRoot [disabled]="true" [invalid]="true">
          <legend arkFieldsetLegend>Legend</legend>
          <span arkFieldsetHelperText>helper</span>
          <span arkFieldsetErrorText>error</span>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).nativeElement as HTMLFieldSetElement
    const legendEl = fixture.debugElement.query(By.directive(ArkFieldsetLegend)).nativeElement as HTMLLegendElement
    const helperEl = fixture.debugElement.query(By.directive(ArkFieldsetHelperText)).nativeElement as HTMLElement
    const errorEl = fixture.debugElement.query(By.directive(ArkFieldsetErrorText)).nativeElement as HTMLElement

    expect(rootEl.getAttribute('data-scope')).toBe('fieldset')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    expect(rootEl.getAttribute('data-disabled')).toBe('')
    expect(rootEl.getAttribute('data-invalid')).toBe('')
    expect(rootEl.hasAttribute('disabled')).toBe(true)

    expect(legendEl.getAttribute('data-scope')).toBe('fieldset')
    expect(legendEl.getAttribute('data-part')).toBe('legend')
    expect(legendEl.getAttribute('data-disabled')).toBe('')
    expect(legendEl.getAttribute('data-invalid')).toBe('')

    expect(helperEl.getAttribute('data-scope')).toBe('fieldset')
    expect(helperEl.getAttribute('data-part')).toBe('helper-text')

    expect(errorEl.getAttribute('data-scope')).toBe('fieldset')
    expect(errorEl.getAttribute('data-part')).toBe('error-text')
    expect(errorEl.getAttribute('aria-live')).toBe('polite')

    fixture.destroy()
  })

  it('generates stable legend/helper/error ids and aria-labelledby points at legend', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldsetLegend, ArkFieldsetHelperText, ArkFieldsetErrorText],
      template: `
        <fieldset arkFieldsetRoot [invalid]="true">
          <legend arkFieldsetLegend>Legend</legend>
          <span arkFieldsetHelperText>helper</span>
          <span arkFieldsetErrorText>error</span>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).injector.get(ArkFieldsetRoot)
    const rootEl = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).nativeElement as HTMLFieldSetElement
    const legendEl = fixture.debugElement.query(By.directive(ArkFieldsetLegend)).nativeElement as HTMLLegendElement
    const helperEl = fixture.debugElement.query(By.directive(ArkFieldsetHelperText)).nativeElement as HTMLElement
    const errorEl = fixture.debugElement.query(By.directive(ArkFieldsetErrorText)).nativeElement as HTMLElement

    expect(legendEl.id).toBe(root.ids.legend)
    expect(helperEl.id).toBe(root.ids.helperText)
    expect(errorEl.id).toBe(root.ids.errorText)
    expect(rootEl.getAttribute('aria-labelledby')).toBe(root.ids.legend)
    expect(rootEl.getAttribute('aria-describedby')).toBe(`${root.ids.errorText} ${root.ids.helperText}`)

    fixture.destroy()
  })

  it('FieldsetRootProvider exposes the externally created fieldset primitive via ARK_FIELDSET_CONTEXT', () => {
    TestBed.configureTestingModule({ imports: [FieldsetRootProviderExample] })
    const fixture = TestBed.createComponent(FieldsetRootProviderExample)
    fixture.detectChanges()

    const providerDebug = fixture.debugElement.query(By.directive(ArkFieldsetRootProvider))
    const providerInstance = providerDebug.injector.get(ArkFieldsetRootProvider)
    const legendDebug = fixture.debugElement.query(By.directive(ArkFieldsetLegend))
    const captured = legendDebug.injector.get(ARK_FIELDSET_CONTEXT)
    expect(captured).toBe(providerInstance)

    const rootEl = providerDebug.nativeElement as HTMLFieldSetElement
    expect(rootEl.hasAttribute('disabled')).toBe(false)
    fixture.componentInstance.toggleDisabled()
    TestBed.tick()
    fixture.detectChanges()
    expect(rootEl.hasAttribute('disabled')).toBe(true)

    fixture.destroy()
  })

  it('FieldsetRootProvider without [value] input throws an Angular required-input error', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRootProvider],
      template: '<fieldset arkFieldsetRootProvider></fieldset>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).toThrow(/required input|value/i)
    fixture.destroy()
  })

  it('FieldsetBasicExample mounts the root with anatomy attrs', () => {
    TestBed.configureTestingModule({ imports: [FieldsetBasicExample] })
    const fixture = TestBed.createComponent(FieldsetBasicExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('fieldset')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    fixture.destroy()
  })

  it('FieldsetDisabledExample propagates disabled to root', () => {
    TestBed.configureTestingModule({ imports: [FieldsetDisabledExample] })
    const fixture = TestBed.createComponent(FieldsetDisabledExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).nativeElement as HTMLFieldSetElement
    expect(rootEl.getAttribute('data-disabled')).toBe('')

    fixture.destroy()
  })

  it('FieldsetInvalidExample renders the error text and marks the root invalid', () => {
    TestBed.configureTestingModule({ imports: [FieldsetInvalidExample] })
    const fixture = TestBed.createComponent(FieldsetInvalidExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkFieldsetRoot)).nativeElement as HTMLFieldSetElement
    const errorEl = fixture.debugElement.query(By.directive(ArkFieldsetErrorText)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-invalid')).toBe('')
    expect(errorEl.getAttribute('data-part')).toBe('error-text')

    fixture.destroy()
  })

  it('FieldsetWithFieldExample renders nested Field with helper text', () => {
    TestBed.configureTestingModule({ imports: [FieldsetWithFieldExample] })
    const fixture = TestBed.createComponent(FieldsetWithFieldExample)
    fixture.detectChanges()

    const fieldRoots = fixture.debugElement.queryAll(By.directive(ArkFieldRoot))
    expect(fieldRoots.length).toBe(2)
    const helperEl = fixture.debugElement.query(By.directive(ArkFieldHelperText)).nativeElement as HTMLElement
    expect(helperEl.getAttribute('data-scope')).toBe('field')

    fixture.destroy()
  })

  it('nested Field inherits disabled and invalid from Fieldset (sanity)', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldRoot, ArkFieldInput, ArkFieldLabel, ArkFieldErrorText],
      template: `
        <fieldset arkFieldsetRoot [disabled]="true" [invalid]="true">
          <div arkFieldRoot>
            <label arkFieldLabel>Name</label>
            <input arkFieldInput />
            <span arkFieldErrorText>Required</span>
          </div>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const fieldRoot = fixture.debugElement.query(By.directive(ArkFieldRoot)).injector.get(ArkFieldRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement

    // Field's underlying useField primitive merges the Fieldset state into its derived signals.
    // The Field root directive exposes only the raw inputs at the directive level, but the
    // merged values propagate through getInputProps() onto the input element.
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')
    expect(inputEl.getAttribute('data-invalid')).toBe('')
    expect(inputEl.hasAttribute('disabled')).toBe(true)

    // The directive still reports the raw user-provided value through its public signals
    // (which is what's expected for a directive @Input signal).
    expect(fieldRoot.disabled()).toBe(false)
    expect(fieldRoot.invalid()).toBe(false)

    fixture.destroy()
  })
})
