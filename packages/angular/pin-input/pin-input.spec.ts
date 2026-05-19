import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_PIN_INPUT_CONTEXT,
  ArkPinInputControl,
  ArkPinInputHiddenInput,
  ArkPinInputInput,
  ArkPinInputLabel,
  ArkPinInputRoot,
  ArkPinInputRootProvider,
  injectArkPinInputContext,
  pinInputAnatomy,
  usePinInput,
  type PinInputApi,
  type PinInputMachine,
  type PinInputMachineProps,
  type PinInputService,
  type UsePinInputOptions,
  type UsePinInputProps,
  type UsePinInputReturn,
} from '@ark-ui/angular/pin-input'
import { ArkFieldRoot } from '@ark-ui/angular/field'

type PinInputPublicTypeSmoke = [
  PinInputApi,
  PinInputMachine,
  PinInputMachineProps,
  PinInputService,
  UsePinInputOptions,
  UsePinInputProps,
  UsePinInputReturn,
]

const typeChar = async (el: HTMLInputElement, char: string) => {
  el.focus()
  el.dispatchEvent(new FocusEvent('focus', { bubbles: false }))
  el.value = char
  el.dispatchEvent(new InputEvent('input', { bubbles: true, data: char, inputType: 'insertText' }))
  await Promise.resolve()
}

describe('@ark-ui/angular/pin-input', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_PIN_INPUT_CONTEXT).toBe('object')
    expect(typeof injectArkPinInputContext).toBe('function')
    expect(typeof usePinInput).toBe('function')
    expect(typeof pinInputAnatomy).toBe('object')
    expect(ArkPinInputRoot).toBeDefined()
    expect(ArkPinInputRootProvider).toBeDefined()
    expect(ArkPinInputLabel).toBeDefined()
    expect(ArkPinInputControl).toBeDefined()
    expect(ArkPinInputInput).toBeDefined()
    expect(ArkPinInputHiddenInput).toBeDefined()
    expect(undefined as PinInputPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('an orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkPinInputInput],
      template: '<input arkPinInputInput [index]="0" />',
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_PIN_INPUT_CONTEXT|No provider|NG0201/i)
  })

  it('digit entry through pin-input-input directives updates api value', async () => {
    @Component({
      standalone: true,
      imports: [ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot type="numeric">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
            <input arkPinInputInput [index]="1" />
            <input arkPinInputInput [index]="2" />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    const inputs = fixture.debugElement
      .queryAll(By.directive(ArkPinInputInput))
      .map((d) => d.nativeElement as HTMLInputElement)

    await typeChar(inputs[0], '1')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value[0]).toBe('1')

    await typeChar(inputs[1], '2')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value[1]).toBe('2')

    await typeChar(inputs[2], '3')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsString).toBe('123')

    fixture.destroy()
  })

  it('merges Field label/control IDs and disabled state into the pin input api', () => {
    @Component({
      standalone: true,
      imports: [
        ArkFieldRoot,
        ArkPinInputRoot,
        ArkPinInputLabel,
        ArkPinInputControl,
        ArkPinInputInput,
        ArkPinInputHiddenInput,
      ],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true">
          <div arkPinInputRoot>
            <label arkPinInputLabel>Code</label>
            <div arkPinInputControl>
              <input arkPinInputInput [index]="0" />
            </div>
            <input arkPinInputHiddenInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    const inputProps = root.api().getInputProps({ index: 0 }) as { disabled?: boolean; id?: string }
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }
    const hiddenProps = root.api().getHiddenInputProps() as { disabled?: boolean; id?: string }

    expect(inputProps.disabled).toBe(true)
    expect(hiddenProps.disabled).toBe(true)
    expect(typeof inputProps.id).toBe('string')
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()

    fixture.destroy()
  })

  it('reactive FormControl writeValue (string[]) propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot [formControl]="control">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
            <input arkPinInputInput [index]="1" />
            <input arkPinInputInput [index]="2" />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>(['1', '2', '3'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    expect(root.api().valueAsString).toBe('123')

    fixture.componentInstance.control.setValue(['4', '5', '6'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsString).toBe('456')

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot [(ngModel)]="model" name="code">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
            <input arkPinInputInput [index]="1" />
            <input arkPinInputInput [index]="2" />
          </div>
        </div>
      `,
    })
    class Host {
      model: string[] = ['7', '8', '9']
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    expect(root.api().valueAsString).toBe('789')

    fixture.destroy()
  })

  it('emits a single valueChange per user-visible value change', async () => {
    @Component({
      standalone: true,
      imports: [ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot (valueChange)="emissions.push($event)">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
            <input arkPinInputInput [index]="1" />
            <input arkPinInputInput [index]="2" />
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string[] | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const input0 = fixture.debugElement.queryAll(By.directive(ArkPinInputInput))[0].nativeElement as HTMLInputElement
    await typeChar(input0, '1')
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the inputs through the same path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot [formControl]="control">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>({ value: ['1'], disabled: false })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    expect((root.api().getInputProps({ index: 0 }) as { disabled?: boolean }).disabled).toBeFalsy()

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect((root.api().getInputProps({ index: 0 }) as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('static [disabled] attribute propagates to api', () => {
    @Component({
      standalone: true,
      imports: [ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot disabled>
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    expect((root.api().getInputProps({ index: 0 }) as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkPinInputRoot, ArkPinInputControl, ArkPinInputInput],
      template: `
        <div arkPinInputRoot [formControl]="control" [(value)]="value">
          <div arkPinInputControl>
            <input arkPinInputInput [index]="0" />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string[] | null>(['1'])
      readonly value = signal<string[] | undefined>(['9'])
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    document.body.appendChild(fixture.nativeElement)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkPinInputRoot)).injector.get(ArkPinInputRoot)
    fixture.componentInstance.control.setValue(['7'])
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsString).toBe('7')

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkPinInputRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })
})
