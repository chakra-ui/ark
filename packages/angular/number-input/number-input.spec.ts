import { Component, signal } from '@angular/core'
import { By } from '@angular/platform-browser'
import { TestBed } from '@angular/core/testing'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  ARK_NUMBER_INPUT_CONTEXT,
  ArkNumberInputControl,
  ArkNumberInputDecrementTrigger,
  ArkNumberInputIncrementTrigger,
  ArkNumberInputInput,
  ArkNumberInputLabel,
  ArkNumberInputRoot,
  ArkNumberInputRootProvider,
  ArkNumberInputScrubber,
  ArkNumberInputValueText,
  injectArkNumberInputContext,
  numberInputAnatomy,
  useNumberInput,
  type NumberInputApi,
  type NumberInputMachine,
  type NumberInputMachineProps,
  type NumberInputService,
  type UseNumberInputOptions,
  type UseNumberInputProps,
  type UseNumberInputReturn,
} from '@ark-ui/angular/number-input'
import { ArkFieldRoot } from '@ark-ui/angular/field'

type NumberInputPublicTypeSmoke = [
  NumberInputApi,
  NumberInputMachine,
  NumberInputMachineProps,
  NumberInputService,
  UseNumberInputOptions,
  UseNumberInputProps,
  UseNumberInputReturn,
]

const pressTrigger = (el: HTMLElement) => {
  el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0, pointerType: 'mouse' }))
  el.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, button: 0, pointerType: 'mouse' }))
}

describe('@ark-ui/angular/number-input', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('exposes the documented public surface', () => {
    expect(typeof ARK_NUMBER_INPUT_CONTEXT).toBe('object')
    expect(typeof injectArkNumberInputContext).toBe('function')
    expect(typeof useNumberInput).toBe('function')
    expect(typeof numberInputAnatomy).toBe('object')
    expect(ArkNumberInputRoot).toBeDefined()
    expect(ArkNumberInputRootProvider).toBeDefined()
    expect(ArkNumberInputLabel).toBeDefined()
    expect(ArkNumberInputControl).toBeDefined()
    expect(ArkNumberInputInput).toBeDefined()
    expect(ArkNumberInputIncrementTrigger).toBeDefined()
    expect(ArkNumberInputDecrementTrigger).toBeDefined()
    expect(ArkNumberInputScrubber).toBeDefined()
    expect(ArkNumberInputValueText).toBeDefined()
    expect(undefined as NumberInputPublicTypeSmoke | undefined).toBeUndefined()
  })

  it('an orphan part directive without an ancestor root throws missing-provider', () => {
    @Component({
      standalone: true,
      imports: [ArkNumberInputInput],
      template: '<input arkNumberInputInput />',
    })
    class Orphan {}

    TestBed.configureTestingModule({ imports: [Orphan] })
    expect(() => TestBed.createComponent(Orphan)).toThrow(/ARK_NUMBER_INPUT_CONTEXT|No provider|NG0201/i)
  })

  it('increment / decrement triggers update value', () => {
    @Component({
      standalone: true,
      imports: [
        ArkNumberInputRoot,
        ArkNumberInputControl,
        ArkNumberInputInput,
        ArkNumberInputIncrementTrigger,
        ArkNumberInputDecrementTrigger,
      ],
      template: `
        <div arkNumberInputRoot defaultValue="5">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
            <button arkNumberInputIncrementTrigger>+</button>
            <button arkNumberInputDecrementTrigger>-</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    const incBtn = fixture.debugElement.query(By.directive(ArkNumberInputIncrementTrigger))
      .nativeElement as HTMLButtonElement
    const decBtn = fixture.debugElement.query(By.directive(ArkNumberInputDecrementTrigger))
      .nativeElement as HTMLButtonElement

    expect(root.api().value).toBe('5')

    pressTrigger(incBtn)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsNumber).toBe(6)

    pressTrigger(decBtn)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsNumber).toBe(5)

    pressTrigger(decBtn)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsNumber).toBe(4)

    fixture.destroy()
  })

  it('clamps to min/max when allowOverflow is false', () => {
    @Component({
      standalone: true,
      imports: [
        ArkNumberInputRoot,
        ArkNumberInputControl,
        ArkNumberInputInput,
        ArkNumberInputIncrementTrigger,
        ArkNumberInputDecrementTrigger,
      ],
      template: `
        <div arkNumberInputRoot defaultValue="9" [min]="0" [max]="10" [allowOverflow]="false">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
            <button arkNumberInputIncrementTrigger>+</button>
            <button arkNumberInputDecrementTrigger>-</button>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    const incBtn = fixture.debugElement.query(By.directive(ArkNumberInputIncrementTrigger))
      .nativeElement as HTMLButtonElement

    pressTrigger(incBtn)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsNumber).toBe(10)

    pressTrigger(incBtn)
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().valueAsNumber).toBe(10)

    fixture.destroy()
  })

  it('reports invalid value through api when value is out of range', () => {
    @Component({
      standalone: true,
      imports: [ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [min]="0" [max]="5" allowOverflow defaultValue="99">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    expect(root.api().invalid).toBe(true)
    expect(root.api().valueAsNumber).toBe(99)

    fixture.destroy()
  })

  it('merges Field label/control IDs and disabled state into the number input api', () => {
    @Component({
      standalone: true,
      imports: [ArkFieldRoot, ArkNumberInputRoot, ArkNumberInputLabel, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkFieldRoot id="fld" [disabled]="true">
          <div arkNumberInputRoot>
            <label arkNumberInputLabel>Qty</label>
            <div arkNumberInputControl>
              <input arkNumberInputInput />
            </div>
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    const inputProps = root.api().getInputProps() as { disabled?: boolean; id?: string }
    const labelProps = root.api().getLabelProps() as { htmlFor?: string; id?: string }

    expect(inputProps.disabled).toBe(true)
    expect(typeof inputProps.id).toBe('string')
    expect(labelProps.htmlFor ?? labelProps.id).toBeDefined()

    fixture.destroy()
  })

  it('reactive FormControl writeValue propagates to the Zag api', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [formControl]="control">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('3')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    expect(root.api().value).toBe('3')

    fixture.componentInstance.control.setValue('8')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('8')

    fixture.destroy()
  })

  it('template-driven [(ngModel)] writes reach the Zag api', async () => {
    @Component({
      standalone: true,
      imports: [FormsModule, ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [(ngModel)]="model" name="qty">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      model = '4'
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    expect(root.api().value).toBe('4')

    fixture.destroy()
  })

  it('onChange fires exactly once per user-visible value change (no duplicate valueChange)', () => {
    @Component({
      standalone: true,
      imports: [ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput, ArkNumberInputIncrementTrigger],
      template: `
        <div arkNumberInputRoot defaultValue="1" (valueChange)="emissions.push($event)">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
            <button arkNumberInputIncrementTrigger>+</button>
          </div>
        </div>
      `,
    })
    class Host {
      readonly emissions: Array<string | undefined> = []
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const before = fixture.componentInstance.emissions.length
    const incBtn = fixture.debugElement.query(By.directive(ArkNumberInputIncrementTrigger))
      .nativeElement as HTMLButtonElement
    pressTrigger(incBtn)
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.emissions.length - before).toBe(1)

    fixture.destroy()
  })

  it('touched callback fires on input blur', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [formControl]="control">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('1')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(false)

    const inputEl = fixture.debugElement.query(By.directive(ArkNumberInputInput)).nativeElement as HTMLInputElement
    inputEl.focus()
    inputEl.dispatchEvent(new FocusEvent('focusin', { bubbles: true }))
    TestBed.tick()
    fixture.detectChanges()
    inputEl.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    inputEl.blur()
    TestBed.tick()
    fixture.detectChanges()

    expect(fixture.componentInstance.control.touched).toBe(true)

    fixture.destroy()
  })

  it('setDisabledState(true) disables the input through the same path as [disabled]', () => {
    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [formControl]="control">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>({ value: '1', disabled: false })
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBeFalsy()

    fixture.componentInstance.control.disable()
    TestBed.tick()
    fixture.detectChanges()

    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('static [disabled] attribute propagates to api', () => {
    @Component({
      standalone: true,
      imports: [ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot disabled>
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {}

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    expect((root.api().getInputProps() as { disabled?: boolean }).disabled).toBe(true)

    fixture.destroy()
  })

  it('mixed form binding + [(value)] emits a dev warning once and the form binding wins', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

    @Component({
      standalone: true,
      imports: [ReactiveFormsModule, ArkNumberInputRoot, ArkNumberInputControl, ArkNumberInputInput],
      template: `
        <div arkNumberInputRoot [formControl]="control" [(value)]="value">
          <div arkNumberInputControl>
            <input arkNumberInputInput />
          </div>
        </div>
      `,
    })
    class Host {
      readonly control = new FormControl<string | null>('1')
      readonly value = signal<string | undefined>('99')
    }

    TestBed.configureTestingModule({ imports: [Host] })
    const fixture = TestBed.createComponent(Host)
    fixture.detectChanges()
    TestBed.tick()
    fixture.detectChanges()

    const root = fixture.debugElement.query(By.directive(ArkNumberInputRoot)).injector.get(ArkNumberInputRoot)
    fixture.componentInstance.control.setValue('7')
    TestBed.tick()
    fixture.detectChanges()
    expect(root.api().value).toBe('7')

    const warnCalls = warn.mock.calls.filter((args) => String(args[0]).includes('ArkNumberInputRoot'))
    expect(warnCalls.length).toBe(1)

    fixture.destroy()
  })
})
