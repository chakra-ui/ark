import { Component, Directive, Injector, inject, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { beforeEach, describe, expect, it } from 'vitest'
import {
  ARK_CHECKBOX_CONTEXT,
  ARK_CHECKBOX_GROUP_CONTEXT,
  ArkCheckboxContext,
  ArkCheckboxControl,
  ArkCheckboxGroup,
  ArkCheckboxGroupProvider,
  ArkCheckboxHiddenInput,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxRoot,
  ArkCheckboxRootProvider,
  checkboxAnatomy,
  injectArkCheckboxContext,
  injectArkCheckboxGroupContext,
  useCheckbox,
  useCheckboxGroup,
  type CheckboxApi,
  type CheckboxCheckedState,
  type CheckboxContextTemplate,
  type CheckboxMachine,
  type CheckboxMachineProps,
  type CheckboxService,
  type UseCheckboxGroupOptions,
  type UseCheckboxGroupProps,
  type UseCheckboxGroupReturn,
  type UseCheckboxOptions,
  type UseCheckboxProps,
  type UseCheckboxReturn,
} from './public-api'
import { CheckboxBasicExample } from './examples/basic'
import { CheckboxContextExample } from './examples/context'
import { CheckboxControlledExample } from './examples/controlled'
import { CheckboxDefaultCheckedExample } from './examples/default-checked'
import { CheckboxDisabledExample } from './examples/disabled'
import { CheckboxGroupExample } from './examples/group'
import { CheckboxGroupControlledExample } from './examples/group-controlled'
import { CheckboxGroupProviderExample } from './examples/group-provider'
import { CheckboxGroupWithFieldsetExample } from './examples/group-with-fieldset'
import { CheckboxGroupWithFormExample } from './examples/group-with-form'
import { CheckboxGroupWithInvalidExample } from './examples/group-with-invalid'
import { CheckboxGroupWithMaxSelectedExample } from './examples/group-with-max-selected'
import { CheckboxGroupWithSelectAllExample } from './examples/group-with-select-all'
import { CheckboxIndeterminateExample } from './examples/indeterminate'
import { CheckboxRootProviderExample } from './examples/root-provider'
import { CheckboxWithFieldExample } from './examples/with-field'
import { CheckboxWithFormExample } from './examples/with-form'

type CheckboxPublicTypeSmoke = [
  CheckboxApi,
  CheckboxMachine,
  CheckboxMachineProps,
  CheckboxService,
  CheckboxContextTemplate,
  UseCheckboxOptions,
  UseCheckboxProps,
  UseCheckboxReturn,
  UseCheckboxGroupOptions,
  UseCheckboxGroupProps,
  UseCheckboxGroupReturn,
]

@Directive({ selector: '[checkboxProbe]', standalone: true, exportAs: 'checkboxProbe' })
class CheckboxProbe {
  private readonly injector = inject(Injector)
  get captured(): UseCheckboxReturn {
    return this.injector.get(ARK_CHECKBOX_CONTEXT)
  }
}

const checkboxImports = [
  ArkCheckboxRoot,
  ArkCheckboxControl,
  ArkCheckboxIndicator,
  ArkCheckboxLabel,
  ArkCheckboxHiddenInput,
]

const clickHiddenInput = (fixture: { debugElement: ReturnType<typeof TestBed.createComponent>['debugElement'] }) => {
  const input = fixture.debugElement.query(By.directive(ArkCheckboxHiddenInput)).nativeElement as HTMLInputElement
  input.click()
  TestBed.tick()
}

describe('@ark-ui/angular/checkbox', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_CHECKBOX_CONTEXT).toBe('object')
    expect(typeof ARK_CHECKBOX_GROUP_CONTEXT).toBe('object')
    expect(typeof injectArkCheckboxContext).toBe('function')
    expect(typeof injectArkCheckboxGroupContext).toBe('function')
    expect(typeof useCheckbox).toBe('function')
    expect(typeof useCheckboxGroup).toBe('function')
    expect(typeof checkboxAnatomy).toBe('object')
    expect(ArkCheckboxRoot).toBeDefined()
    expect(ArkCheckboxRootProvider).toBeDefined()
    expect(ArkCheckboxControl).toBeDefined()
    expect(ArkCheckboxIndicator).toBeDefined()
    expect(ArkCheckboxLabel).toBeDefined()
    expect(ArkCheckboxHiddenInput).toBeDefined()
    expect(ArkCheckboxContext).toBeDefined()
    expect(ArkCheckboxGroup).toBeDefined()
    expect(ArkCheckboxGroupProvider).toBeDefined()
    expect(undefined as CheckboxPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('descendant probe under [arkCheckbox] receives the Root directive instance via ARK_CHECKBOX_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkCheckboxRoot, CheckboxProbe],
      template: `
        <label arkCheckbox>
          <span checkboxProbe></span>
        </label>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    const probe = fixture.debugElement.query(By.directive(CheckboxProbe)).injector.get(CheckboxProbe)
    expect(probe.captured).toBe(root)

    fixture.destroy()
  })

  it('an orphan part directive without an ancestor [arkCheckbox] throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkCheckboxControl],
      template: '<span arkCheckboxControl></span>',
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_CHECKBOX_CONTEXT|No provider|NG0201/i)
  })

  it('clicking the hidden input checks the checkbox, updates data-state, and emits checkedChange exactly once', () => {
    @Component({
      standalone: true,
      imports: checkboxImports,
      template: `
        <label arkCheckbox (checkedChange)="emissions.push($event)">
          <span arkCheckboxControl></span>
          <span arkCheckboxLabel>Checkbox</span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {
      readonly emissions: Array<CheckboxCheckedState | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    const control = fixture.debugElement.query(By.directive(ArkCheckboxControl)).nativeElement as HTMLElement
    expect(root.api().checked).toBe(false)
    expect(control.getAttribute('data-state')).toBe('unchecked')

    clickHiddenInput(fixture)
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    expect(control.getAttribute('data-state')).toBe('checked')
    expect(fixture.componentInstance.emissions).toEqual([true])

    fixture.destroy()
  })

  it('controlled [(checked)] round-trips a host signal and does not re-emit when the same value is written twice', () => {
    @Component({
      standalone: true,
      imports: checkboxImports,
      template: `
        <label arkCheckbox [(checked)]="checked" (checkedChange)="emissions.push($event)">
          <span arkCheckboxControl></span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {
      readonly checked = signal<CheckboxCheckedState | undefined>(false)
      readonly emissions: Array<CheckboxCheckedState | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    fixture.componentInstance.checked.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    const emissionsAfterFirstWrite = fixture.componentInstance.emissions.length

    fixture.componentInstance.checked.set(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)
    expect(fixture.componentInstance.emissions.length).toBe(emissionsAfterFirstWrite)

    fixture.destroy()
  })

  it('[defaultChecked] property binding starts the checkbox checked', () => {
    @Component({
      standalone: true,
      imports: checkboxImports,
      template: `
        <label arkCheckbox [defaultChecked]="true">
          <span arkCheckboxControl></span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    expect(root.api().checked).toBe(true)
    fixture.destroy()
  })

  it('bare static defaultChecked attribute starts the checkbox checked via booleanAttribute', () => {
    @Component({
      standalone: true,
      imports: checkboxImports,
      template: `
        <label arkCheckbox defaultChecked>
          <span arkCheckboxControl></span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    expect(root.api().checked).toBe(true)
    fixture.destroy()
  })

  it('[disabled] prevents checked changes', () => {
    @Component({
      standalone: true,
      imports: checkboxImports,
      template: `
        <label arkCheckbox [disabled]="true" (checkedChange)="emissions.push($event)">
          <span arkCheckboxControl></span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {
      readonly emissions: Array<CheckboxCheckedState | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    expect(root.api().disabled).toBe(true)

    clickHiddenInput(fixture)
    fixture.detectChanges()

    expect(root.api().checked).toBe(false)
    expect(fixture.componentInstance.emissions).toEqual([])
    fixture.destroy()
  })

  it('group roots share selection through ARK_CHECKBOX_GROUP_CONTEXT', () => {
    @Component({
      standalone: true,
      imports: [ArkCheckboxGroup, ...checkboxImports],
      template: `
        <div arkCheckboxGroup [defaultValue]="['react']" name="framework">
          <label arkCheckbox value="react"><input arkCheckboxHiddenInput /></label>
          <label arkCheckbox value="solid"><input arkCheckboxHiddenInput /></label>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const group = fixture.debugElement.query(By.directive(ArkCheckboxGroup)).injector.get(ArkCheckboxGroup)
    const inputs = fixture.debugElement
      .queryAll(By.directive(ArkCheckboxHiddenInput))
      .map((debug) => debug.nativeElement as HTMLInputElement)

    expect(group.value()).toEqual(['react'])
    inputs[1].click()
    TestBed.tick()
    fixture.detectChanges()

    expect(group.value()).toEqual(['react', 'solid'])
    expect(inputs[0].name).toBe('framework')
    expect(inputs[1].name).toBe('framework')
    fixture.destroy()
  })

  it('maxSelectedValues disables unchecked group items once the max is reached', () => {
    @Component({
      standalone: true,
      imports: [ArkCheckboxGroup, ...checkboxImports],
      template: `
        <div arkCheckboxGroup [defaultValue]="['react']" [maxSelectedValues]="1">
          <label arkCheckbox value="react"><input arkCheckboxHiddenInput /></label>
          <label arkCheckbox value="solid"><input arkCheckboxHiddenInput /></label>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const inputs = fixture.debugElement
      .queryAll(By.directive(ArkCheckboxHiddenInput))
      .map((debug) => debug.nativeElement as HTMLInputElement)
    expect(inputs[0].disabled).toBe(false)
    expect(inputs[1].disabled).toBe(true)
    fixture.destroy()
  })

  it('integrates with reactive forms through the checked model signal', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ...checkboxImports],
      template: `
        <label arkCheckbox [formControl]="control">
          <span arkCheckboxControl></span>
          <input arkCheckboxHiddenInput />
        </label>
      `,
    })
    class Host {
      readonly control = new FormControl<CheckboxCheckedState | null>(false)
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkCheckboxRoot)).injector.get(ArkCheckboxRoot)
    fixture.componentInstance.control.setValue(true)
    TestBed.tick()
    fixture.detectChanges()

    expect(root.api().checked).toBe(true)

    clickHiddenInput(fixture)
    fixture.detectChanges()
    expect(fixture.componentInstance.control.value).toBe(false)
    fixture.destroy()
  })

  it.each([
    ['Basic', CheckboxBasicExample],
    ['Controlled', CheckboxControlledExample],
    ['DefaultChecked', CheckboxDefaultCheckedExample],
    ['Disabled', CheckboxDisabledExample],
    ['Group', CheckboxGroupExample],
    ['GroupControlled', CheckboxGroupControlledExample],
    ['GroupProvider', CheckboxGroupProviderExample],
    ['GroupWithForm', CheckboxGroupWithFormExample],
    ['GroupWithInvalid', CheckboxGroupWithInvalidExample],
    ['GroupWithMaxSelected', CheckboxGroupWithMaxSelectedExample],
    ['GroupWithSelectAll', CheckboxGroupWithSelectAllExample],
    ['Indeterminate', CheckboxIndeterminateExample],
    ['Context', CheckboxContextExample],
    ['RootProvider', CheckboxRootProviderExample],
    ['WithField', CheckboxWithFieldExample],
    ['GroupWithFieldset', CheckboxGroupWithFieldsetExample],
    ['WithForm', CheckboxWithFormExample],
  ])('%s example renders checkbox anatomy', (_name, ExampleComponent) => {
    TestBed.configureTestingModule({ imports: [ExampleComponent] })
    const fixture = TestBed.createComponent(ExampleComponent)
    fixture.detectChanges()

    const checkbox = fixture.nativeElement.querySelector('[data-scope="checkbox"]') as HTMLElement | null
    expect(checkbox).not.toBeNull()
    expect(fixture.nativeElement.querySelector('[data-part="control"]')).not.toBeNull()
    fixture.destroy()
  })
})
