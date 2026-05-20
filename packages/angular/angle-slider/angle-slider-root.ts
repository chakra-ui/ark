import type * as angleSlider from '@zag-js/angle-slider'
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
  numberAttribute,
  output,
  signal,
  type InputSignal,
  type InputSignalWithTransform,
  type ModelSignal,
  type OutputEmitterRef,
  type Signal,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { createArkCvaController } from '@ark-ui/angular/src/internal'
import type { AngleSliderElementIds, AngleSliderValueChangeDetails } from './angle-slider.types'
import { ARK_ANGLE_SLIDER_CONTEXT } from './use-angle-slider-context'
import { useAngleSlider, type UseAngleSliderReturn } from './use-angle-slider'

const optionalNumberAttribute = (value: unknown): number | undefined => {
  if (value == null) return undefined
  return numberAttribute(value)
}

@Directive({
  selector: '[arkAngleSlider]',
  standalone: true,
  exportAs: 'arkAngleSlider',
  providers: [
    { provide: ARK_ANGLE_SLIDER_CONTEXT, useExisting: forwardRef(() => ArkAngleSliderRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkAngleSliderRoot), multi: true },
  ],
})
export class ArkAngleSliderRoot implements ControlValueAccessor, UseAngleSliderReturn {
  /** The unique identifier of the angle slider. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the elements in the angle slider. Useful for composition. */
  readonly ids: InputSignal<AngleSliderElementIds | undefined> = input<AngleSliderElementIds | undefined>(undefined)
  /** The name of the angle slider. Useful for form submission. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** Whether the angle slider is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the angle slider is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the angle slider is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The controlled value of the angle slider. */
  readonly value: ModelSignal<number | undefined> = model<number | undefined>(undefined)
  /** The initial value of the angle slider when uncontrolled. */
  readonly defaultValue: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(
    undefined,
    { transform: optionalNumberAttribute },
  )
  /** The step value for the angle slider. */
  readonly step: InputSignalWithTransform<number | undefined, unknown> = input<number | undefined, unknown>(undefined, {
    transform: optionalNumberAttribute,
  })
  /** The accessible label for the angle slider thumb. */
  readonly ariaLabel: InputSignal<string | undefined> = input<string | undefined>(undefined, { alias: 'aria-label' })
  /** The id of the element that labels the angle slider thumb. */
  readonly ariaLabelledby: InputSignal<string | undefined> = input<string | undefined>(undefined, {
    alias: 'aria-labelledby',
  })
  /** Emits when the value change interaction ends. */
  readonly valueChangeEnd: OutputEmitterRef<AngleSliderValueChangeDetails> = output<AngleSliderValueChangeDetails>()

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<number>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkAngleSliderRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useAngleSlider({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      name: this.name(),
      invalid: this.invalid() || undefined,
      readOnly: this.readOnly() || undefined,
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      value: this.value(),
      defaultValue: this.defaultValue(),
      step: this.step(),
      'aria-label': this.ariaLabel(),
      'aria-labelledby': this.ariaLabelledby(),
      onValueChange: (details: AngleSliderValueChangeDetails) => {
        if (this.value() !== details.value) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
      },
      onValueChangeEnd: (details: AngleSliderValueChangeDetails) => {
        this.valueChangeEnd.emit(details)
        this.cva.markTouched()
      },
    }),
  })

  readonly state: Signal<angleSlider.Service['state']> = this.machine.state
  readonly api: Signal<angleSlider.Api> = this.machine.api
  readonly service: angleSlider.Service = this.machine.service
  readonly send: angleSlider.Service['send'] = this.machine.send

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

  writeValue(value: number | null): void {
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

  registerOnChange(fn: (value: number | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
