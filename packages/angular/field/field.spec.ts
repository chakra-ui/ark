import { Component } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_FIELD_CONTEXT,
  ArkFieldErrorText,
  ArkFieldHelperText,
  ArkFieldInput,
  ArkFieldItem,
  ArkFieldLabel,
  ArkFieldRequiredIndicator,
  ArkFieldRoot,
  ArkFieldRootProvider,
  ArkFieldSelect,
  ArkFieldTextarea,
  fieldAnatomy,
  injectArkFieldContext,
  injectArkFieldContextOptional,
  useField,
  type FieldElementIds,
  type FieldResolvedIds,
  type UseFieldOptions,
  type UseFieldProps,
  type UseFieldReturn,
} from '@ark-ui/angular/field'
import { ArkFieldsetRoot } from '@ark-ui/angular/fieldset'
import { FieldInputExample } from './examples/input'
import { FieldItemExample } from './examples/item'
import { FieldInvalidExample } from './examples/invalid'
import { FieldRequiredIndicatorExample } from './examples/required-indicator'
import { FieldRootProviderExample } from './examples/root-provider'

type FieldPublicTypeSmoke = [FieldElementIds, FieldResolvedIds, UseFieldOptions, UseFieldProps, UseFieldReturn]

describe('@ark-ui/angular/field', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_FIELD_CONTEXT).toBe('object')
    expect(typeof injectArkFieldContext).toBe('function')
    expect(typeof injectArkFieldContextOptional).toBe('function')
    expect(typeof useField).toBe('function')
    expect(typeof fieldAnatomy).toBe('object')
    expect(ArkFieldRoot).toBeDefined()
    expect(ArkFieldRootProvider).toBeDefined()
    expect(ArkFieldLabel).toBeDefined()
    expect(ArkFieldInput).toBeDefined()
    expect(ArkFieldTextarea).toBeDefined()
    expect(ArkFieldSelect).toBeDefined()
    expect(ArkFieldHelperText).toBeDefined()
    expect(ArkFieldErrorText).toBeDefined()
    expect(ArkFieldRequiredIndicator).toBeDefined()
    expect(ArkFieldItem).toBeDefined()
    expect(undefined as FieldPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('root provides ARK_FIELD_CONTEXT to descendants and exposes itself as UseFieldReturn', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFieldInput],
      template: '<div arkFieldRoot><input arkFieldInput /></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkFieldRoot))
    const inputDebug = fixture.debugElement.query(By.directive(ArkFieldInput))
    const rootInstance = rootDebug.injector.get(ArkFieldRoot)
    const captured = inputDebug.injector.get(ARK_FIELD_CONTEXT)
    expect(captured).toBe(rootInstance)

    fixture.destroy()
  })

  it('an orphan [arkFieldInput] without an ancestor root throws missing-provider error', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldInput],
      template: '<input arkFieldInput />',
    })
    class OrphanHost {}

    TestBed.configureTestingModule({ imports: [OrphanHost] })
    expect(() => TestBed.createComponent(OrphanHost)).toThrow(/ARK_FIELD_CONTEXT|No provider|NG0201/i)
  })

  it('generates stable label and control ids and sets data attributes on root', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFieldLabel, ArkFieldInput],
      template: `
        <div arkFieldRoot>
          <label arkFieldLabel></label>
          <input arkFieldInput />
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const rootDebug = fixture.debugElement.query(By.directive(ArkFieldRoot))
    const root = rootDebug.injector.get(ArkFieldRoot)
    const rootEl = rootDebug.nativeElement as HTMLElement
    const labelEl = fixture.debugElement.query(By.directive(ArkFieldLabel)).nativeElement as HTMLLabelElement
    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement

    expect(rootEl.getAttribute('data-scope')).toBe('field')
    expect(rootEl.getAttribute('data-part')).toBe('root')
    expect(rootEl.getAttribute('role')).toBe('group')

    const controlId = root.ids.control
    const labelId = root.ids.label
    expect(controlId.length).toBeGreaterThan(0)
    expect(labelId.length).toBeGreaterThan(0)
    expect(inputEl.getAttribute('id')).toBe(controlId)
    expect(labelEl.getAttribute('id')).toBe(labelId)
    expect(labelEl.htmlFor).toBe(controlId)

    fixture.destroy()
  })

  it('mounting helper/error text updates aria-describedby on input/textarea/select', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFieldInput, ArkFieldTextarea, ArkFieldSelect, ArkFieldHelperText, ArkFieldErrorText],
      template: `
        <div arkFieldRoot [invalid]="true">
          <input arkFieldInput />
          <textarea arkFieldTextarea></textarea>
          <select arkFieldSelect></select>
          <span arkFieldHelperText>helper</span>
          <span arkFieldErrorText>error</span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFieldRoot)).injector.get(ArkFieldRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    const textareaEl = fixture.debugElement.query(By.directive(ArkFieldTextarea)).nativeElement as HTMLTextAreaElement
    const selectEl = fixture.debugElement.query(By.directive(ArkFieldSelect)).nativeElement as HTMLSelectElement

    const expected = `${root.ids.errorText} ${root.ids.helperText}`
    expect(inputEl.getAttribute('aria-describedby')).toBe(expected)
    expect(textareaEl.getAttribute('aria-describedby')).toBe(expected)
    expect(selectEl.getAttribute('aria-describedby')).toBe(expected)
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')

    fixture.destroy()
  })

  it('aria-describedby only references error text when field is invalid', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFieldInput, ArkFieldHelperText, ArkFieldErrorText],
      template: `
        <div arkFieldRoot [invalid]="false">
          <input arkFieldInput />
          <span arkFieldHelperText>helper</span>
          <span arkFieldErrorText>error</span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFieldRoot)).injector.get(ArkFieldRoot)
    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    expect(inputEl.getAttribute('aria-describedby')).toBe(root.ids.helperText)

    fixture.destroy()
  })

  it('required indicator applies anatomy attrs and aria-hidden', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkFieldRequiredIndicator],
      template: `
        <div arkFieldRoot [required]="true">
          <span arkFieldRequiredIndicator>*</span>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const indicatorEl = fixture.debugElement.query(By.directive(ArkFieldRequiredIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-scope')).toBe('field')
    expect(indicatorEl.getAttribute('data-part')).toBe('required-indicator')
    expect(indicatorEl.getAttribute('aria-hidden')).toBe('true')

    fixture.destroy()
  })

  it('field item resolves its control id from the target value and provides scoped context', () => {
    TestBed.configureTestingModule({ imports: [FieldItemExample] })
    const fixture = TestBed.createComponent(FieldItemExample)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkFieldRoot)).injector.get(ArkFieldRoot)
    const itemDebugs = fixture.debugElement.queryAll(By.directive(ArkFieldItem))
    expect(itemDebugs.length).toBe(2)

    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    const selectEl = fixture.debugElement.query(By.directive(ArkFieldSelect)).nativeElement as HTMLSelectElement

    const amountControlId = root.getItemControlId('amount')
    const currencyControlId = root.getItemControlId('currency')
    expect(inputEl.getAttribute('id')).toBe(amountControlId)
    expect(selectEl.getAttribute('id')).toBe(currencyControlId)

    // The root label was rendered with target="amount", so its htmlFor must point at the amount item
    const labelEl = fixture.debugElement.query(By.directive(ArkFieldLabel)).nativeElement as HTMLLabelElement
    expect(labelEl.htmlFor).toBe(amountControlId)

    fixture.destroy()
  })

  it('FieldRootProvider exposes the externally created field primitive via ARK_FIELD_CONTEXT', () => {
    TestBed.configureTestingModule({ imports: [FieldRootProviderExample] })
    const fixture = TestBed.createComponent(FieldRootProviderExample)
    fixture.detectChanges()

    const providerDebug = fixture.debugElement.query(By.directive(ArkFieldRootProvider))
    const providerInstance = providerDebug.injector.get(ArkFieldRootProvider)
    const inputDebug = fixture.debugElement.query(By.directive(ArkFieldInput))
    const captured = inputDebug.injector.get(ARK_FIELD_CONTEXT)
    expect(captured).toBe(providerInstance)

    // Toggle invalid via the example button and confirm aria-invalid flips.
    const inputEl = inputDebug.nativeElement as HTMLInputElement
    expect(inputEl.getAttribute('aria-invalid')).toBe(null)
    fixture.componentInstance.toggleInvalid()
    TestBed.tick()
    fixture.detectChanges()
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')

    fixture.destroy()
  })

  it('FieldRootProvider without [value] input throws an Angular required-input error', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRootProvider],
      template: '<div arkFieldRootProvider></div>',
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    expect(() => fixture.detectChanges()).toThrow(/required input|value/i)
    fixture.destroy()
  })

  it('FieldInputExample mounts the root with anatomy attrs', () => {
    TestBed.configureTestingModule({ imports: [FieldInputExample] })
    const fixture = TestBed.createComponent(FieldInputExample)
    fixture.detectChanges()

    const rootEl = fixture.debugElement.query(By.directive(ArkFieldRoot)).nativeElement as HTMLElement
    expect(rootEl.getAttribute('data-scope')).toBe('field')
    expect(rootEl.getAttribute('data-part')).toBe('root')

    fixture.destroy()
  })

  it('FieldInvalidExample marks the control aria-invalid="true"', () => {
    TestBed.configureTestingModule({ imports: [FieldInvalidExample] })
    const fixture = TestBed.createComponent(FieldInvalidExample)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')

    fixture.destroy()
  })

  it('inherits Fieldset disabled and invalid state when Field does not override them', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldRoot, ArkFieldInput, ArkFieldLabel],
      template: `
        <fieldset arkFieldsetRoot [disabled]="true" [invalid]="true">
          <div arkFieldRoot>
            <label arkFieldLabel>Name</label>
            <input arkFieldInput />
          </div>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    const labelEl = fixture.debugElement.query(By.directive(ArkFieldLabel)).nativeElement as HTMLLabelElement

    // The merged disabled/invalid flows into Field's getInputProps() and getLabelProps()
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')
    expect(inputEl.getAttribute('data-invalid')).toBe('')
    expect(inputEl.hasAttribute('disabled')).toBe(true)
    expect(labelEl.getAttribute('data-disabled')).toBe('')
    expect(labelEl.getAttribute('data-invalid')).toBe('')

    fixture.destroy()
  })

  it('field-level explicit disabled/invalid overrides Fieldset state', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldRoot, ArkFieldInput],
      template: `
        <fieldset arkFieldsetRoot>
          <div arkFieldRoot [disabled]="true" [invalid]="true">
            <input arkFieldInput />
          </div>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    expect(inputEl.hasAttribute('disabled')).toBe(true)
    expect(inputEl.getAttribute('aria-invalid')).toBe('true')

    fixture.destroy()
  })

  it('Field without explicit override falls back to no disabled/invalid when Fieldset is not invalid', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldsetRoot, ArkFieldRoot, ArkFieldInput],
      template: `
        <fieldset arkFieldsetRoot>
          <div arkFieldRoot>
            <input arkFieldInput />
          </div>
        </fieldset>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputEl = fixture.debugElement.query(By.directive(ArkFieldInput)).nativeElement as HTMLInputElement
    expect(inputEl.hasAttribute('disabled')).toBe(false)
    expect(inputEl.getAttribute('aria-invalid')).toBe(null)

    fixture.destroy()
  })

  it('FieldRequiredIndicatorExample marks the control required and indicator visible', () => {
    TestBed.configureTestingModule({ imports: [FieldRequiredIndicatorExample] })
    const fixture = TestBed.createComponent(FieldRequiredIndicatorExample)
    fixture.detectChanges()

    const labelEl = fixture.debugElement.query(By.directive(ArkFieldLabel)).nativeElement as HTMLLabelElement
    expect(labelEl.getAttribute('data-required')).toBe('')

    const indicatorEl = fixture.debugElement.query(By.directive(ArkFieldRequiredIndicator)).nativeElement as HTMLElement
    expect(indicatorEl.getAttribute('data-part')).toBe('required-indicator')

    fixture.destroy()
  })
})
