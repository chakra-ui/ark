import type * as pinInput from '@zag-js/pin-input'
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
  PinInputElementIds,
  PinInputIntlTranslations,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
} from './pin-input.types'
import {
  ARK_PIN_INPUT_CONTEXT,
  ARK_PIN_INPUT_COUNT_REGISTRAR,
  type PinInputCountRegistrar,
} from './use-pin-input-context'
import { usePinInput, type UsePinInputReturn } from './use-pin-input'

@Directive({
  selector: '[arkPinInputRoot]',
  standalone: true,
  exportAs: 'arkPinInputRoot',
  providers: [
    { provide: ARK_PIN_INPUT_CONTEXT, useExisting: forwardRef(() => ArkPinInputRoot) },
    { provide: ARK_PIN_INPUT_COUNT_REGISTRAR, useExisting: forwardRef(() => ArkPinInputRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkPinInputRoot), multi: true },
  ],
})
export class ArkPinInputRoot implements ControlValueAccessor, UsePinInputReturn, PinInputCountRegistrar {
  /** The id of the pin input. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the pin input parts. */
  readonly elementIds: InputSignal<PinInputElementIds | undefined> = input<PinInputElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The controlled value of the pin input as an array of digit strings. */
  readonly value: ModelSignal<string[] | undefined> = model<string[] | undefined>(undefined)
  /** The initial value of the pin input when uncontrolled. */
  readonly defaultValue: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined)
  /** Whether the pin input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the pin input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the pin input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the pin input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name attribute of the hidden input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The form attribute of the hidden input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The regular expression checked against user-entered values. */
  readonly pattern: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The placeholder text for each input slot. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether to auto-focus the first input. */
  readonly autoFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to flag inputs as OTP for autocomplete. */
  readonly otp: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to mask the input value like a password. */
  readonly mask: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to auto-submit the owning form when complete. */
  readonly autoSubmit: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to blur the input when the value is complete. */
  readonly blurOnComplete: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to select the input value when focused. */
  readonly selectOnFocus: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The type of value the pin-input should allow. */
  readonly type: InputSignal<'alphanumeric' | 'numeric' | 'alphabetic' | undefined> = input<
    'alphanumeric' | 'numeric' | 'alphabetic' | undefined
  >(undefined)
  /** Function to sanitize pasted values. */
  readonly sanitizeValue: InputSignal<((value: string) => string) | undefined> = input<
    ((value: string) => string) | undefined
  >(undefined)
  /** The number of input slots. */
  readonly count: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The translations for the pin input. */
  readonly translations: InputSignal<PinInputIntlTranslations | undefined> = input<
    PinInputIntlTranslations | undefined
  >(undefined)

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private readonly _registeredIndices = new Set<number>()

  private readonly cva = createArkCvaController<string[]>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkPinInputRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = usePinInput({
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
      pattern: this.pattern(),
      placeholder: this.placeholder(),
      autoFocus: this.autoFocus() || undefined,
      otp: this.otp() || undefined,
      mask: this.mask() || undefined,
      autoSubmit: this.autoSubmit() || undefined,
      blurOnComplete: this.blurOnComplete() || undefined,
      selectOnFocus: this.selectOnFocus() || undefined,
      type: this.type(),
      sanitizeValue: this.sanitizeValue(),
      count: this.count(),
      translations: this.translations(),
      onValueChange: (details: PinInputValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
      },
      onValueComplete: (_details: PinInputValueChangeDetails) => {
        this.cva.markTouched()
      },
      onValueInvalid: (_details: PinInputValueInvalidDetails) => {
        // no-op; surface via consumer if needed
      },
    }),
  })

  readonly state: Signal<pinInput.Service['state']> = this.machine.state
  readonly api: Signal<pinInput.Api> = this.machine.api
  readonly service: pinInput.Service = this.machine.service
  readonly send: pinInput.Service['send'] = this.machine.send

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

  writeValue(value: string[] | null): void {
    const next = value === null ? undefined : value
    if (this.value() !== undefined) {
      this._hasExternalBinding = true
    }
    if (this.value() !== next) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string[] | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }

  register(index: number): () => void {
    this._registeredIndices.add(index)
    this._syncCount()
    return () => {
      this._registeredIndices.delete(index)
      this._syncCount()
    }
  }

  private _syncCount(): void {
    const next = this._registeredIndices.size
    if (next === 0) return
    const ctx = this.service.context as { get: (k: string) => unknown; set: (k: string, v: unknown) => void }
    if (ctx.get('count') !== next) {
      ctx.set('count', next)
    }
  }
}
