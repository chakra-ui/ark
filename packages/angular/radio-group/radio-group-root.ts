import type * as radioGroup from '@zag-js/radio-group'
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
import { createArkCvaController } from '@ark-ui/angular/src/internal'
import type {
  RadioGroupElementIds,
  RadioGroupOrientation,
  RadioGroupService,
  RadioGroupValueChangeDetails,
} from './radio-group.types'
import { ARK_RADIO_GROUP_CONTEXT } from './use-radio-group-context'
import { useRadioGroup, type UseRadioGroupReturn } from './use-radio-group'

@Directive({
  selector: '[arkRadioGroup]',
  standalone: true,
  exportAs: 'arkRadioGroup',
  providers: [
    { provide: ARK_RADIO_GROUP_CONTEXT, useExisting: forwardRef(() => ArkRadioGroupRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkRadioGroupRoot), multi: true },
  ],
})
export class ArkRadioGroupRoot implements ControlValueAccessor, UseRadioGroupReturn {
  /** The unique identifier of the radio group. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the radio group parts. */
  readonly elementIds: InputSignal<RadioGroupElementIds | undefined> = input<RadioGroupElementIds | undefined>(
    undefined,
    { alias: 'ids' },
  )
  /** The controlled value of the radio group. */
  readonly value: ModelSignal<string | null | undefined> = model<string | null | undefined>(undefined)
  /** The initial value of the checked radio when uncontrolled. */
  readonly defaultValue: InputSignal<string | null | undefined> = input<string | null | undefined>(undefined)
  /** The name attribute of the radio inputs. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the underlying radio inputs. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the radio group is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the radio group is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the radio group is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the radio group is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The orientation of the radio group. */
  readonly orientation: InputSignal<RadioGroupOrientation | undefined> = input<RadioGroupOrientation | undefined>(
    undefined,
  )

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<string | null>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkRadioGroupRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useRadioGroup({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      name: this.name(),
      form: this.form(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      invalid: this.invalid() || undefined,
      required: this.required() || undefined,
      readOnly: this.readOnly() || undefined,
      orientation: this.orientation(),
      onValueChange: (details: RadioGroupValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
      },
    }),
  })

  readonly state: Signal<RadioGroupService['state']> = this.machine.state
  readonly api: Signal<radioGroup.Api> = this.machine.api
  readonly service: RadioGroupService = this.machine.service
  readonly send: RadioGroupService['send'] = this.machine.send

  constructor() {
    let firstRun = true
    effect(() => {
      void this.value()
      if (firstRun) {
        firstRun = false
        this._pendingInternalWrites = 0
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
    const current = this.value()
    if (!this._hasReceivedFormWrite && current !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (current !== next) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: string | null | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
