import type * as numberInput from '@zag-js/number-input'
import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type Signal,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkCvaController } from '../src/forms/control-value-accessor'
import type {
  NumberInputElementIds,
  NumberInputFocusChangeDetails,
  NumberInputInputMode,
  NumberInputIntlTranslations,
  NumberInputValueChangeDetails,
} from './number-input.types'
import { ARK_NUMBER_INPUT_CONTEXT } from './use-number-input-context'
import { useNumberInput, type UseNumberInputReturn } from './use-number-input'

@Directive({
  selector: '[arkNumberInputRoot]',
  standalone: true,
  exportAs: 'arkNumberInputRoot',
  providers: [
    { provide: ARK_NUMBER_INPUT_CONTEXT, useExisting: forwardRef(() => ArkNumberInputRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkNumberInputRoot), multi: true },
  ],
})
export class ArkNumberInputRoot implements ControlValueAccessor, UseNumberInputReturn {
  /** The id of the number input. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the number input parts. */
  readonly elementIds: InputSignal<NumberInputElementIds | undefined> = input<NumberInputElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The controlled value of the number input. */
  readonly value: ModelSignal<string | undefined> = model<string | undefined>(undefined)
  /** The initial value of the number input when uncontrolled. */
  readonly defaultValue: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the number input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the number input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the number input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the number input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name attribute of the number input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The form attribute of the number input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The minimum value of the number input. */
  readonly min: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum value of the number input. */
  readonly max: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The amount to increment or decrement the value by. */
  readonly step: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The pattern used to check the input value against. */
  readonly pattern: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether to allow mouse wheel to change the value. */
  readonly allowMouseWheel: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to allow the value to overflow the min/max range. */
  readonly allowOverflow: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to clamp the value when the input loses focus. */
  readonly clampValueOnBlur: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to focus the input when the value changes. */
  readonly focusInputOnChange: InputSignalWithTransform<boolean, unknown> = input(true, {
    transform: booleanAttribute,
  })
  /** Whether to spin the value when the increment/decrement button is held. */
  readonly spinOnPress: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** The input mode for the number input. */
  readonly inputMode: InputSignal<NumberInputInputMode | undefined> = input<NumberInputInputMode | undefined>(undefined)
  /** The format options for the number input. */
  readonly formatOptions: InputSignal<Intl.NumberFormatOptions | undefined> = input<
    Intl.NumberFormatOptions | undefined
  >(undefined)
  /** The translations for the number input. */
  readonly translations: InputSignal<NumberInputIntlTranslations | undefined> = input<
    NumberInputIntlTranslations | undefined
  >(undefined)

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false

  private readonly cva = createArkCvaController<string>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkNumberInputRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useNumberInput({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      name: this.name(),
      form: this.form(),
      min: this.min(),
      max: this.max(),
      step: this.step(),
      pattern: this.pattern(),
      allowMouseWheel: this.allowMouseWheel() || undefined,
      allowOverflow: this.allowOverflow() || undefined,
      clampValueOnBlur: this.clampValueOnBlur(),
      focusInputOnChange: this.focusInputOnChange(),
      spinOnPress: this.spinOnPress(),
      inputMode: this.inputMode(),
      formatOptions: this.formatOptions(),
      translations: this.translations(),
      onValueChange: (details: NumberInputValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
      },
      onValueCommit: () => {
        this.cva.markTouched()
      },
      onFocusChange: (details: NumberInputFocusChangeDetails) => {
        if (!details.focused) {
          this.cva.markTouched()
        }
      },
    }),
  })

  readonly state: Signal<numberInput.Service['state']> = this.machine.state
  readonly api: Signal<numberInput.Api> = this.machine.api
  readonly service: numberInput.Service = this.machine.service
  readonly send: numberInput.Service['send'] = this.machine.send

  constructor() {
    let firstRun = true
    effect(() => {
      void this.value()
      if (firstRun) {
        firstRun = false
        return
      }
      if (this._pendingInternalWrites > 0) {
        this._pendingInternalWrites--
        return
      }
      this._hasExternalBinding = true
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  writeValue(value: string | null): void {
    const next = value === null ? undefined : value
    if (this.value() !== undefined) {
      this._hasExternalBinding = true
    }
    if (this.value() !== next) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
