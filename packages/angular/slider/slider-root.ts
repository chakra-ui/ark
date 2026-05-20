import type * as slider from '@zag-js/slider'
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
import type {
  SliderElementIds,
  SliderFocusChangeDetails,
  SliderThumbAlignment,
  SliderThumbCollisionBehavior,
  SliderValueChangeDetails,
  SliderValueTextDetails,
} from './slider.types'
import { ARK_SLIDER_CONTEXT } from './use-slider-context'
import { useSlider, type UseSliderReturn } from './use-slider'

const arraysShallowEqual = (a: readonly number[] | undefined, b: readonly number[] | undefined): boolean => {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  return a.every((value, index) => Object.is(value, b[index]))
}

@Directive({
  selector: '[arkSlider]',
  standalone: true,
  exportAs: 'arkSlider',
  providers: [
    { provide: ARK_SLIDER_CONTEXT, useExisting: forwardRef(() => ArkSliderRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkSliderRoot), multi: true },
  ],
})
export class ArkSliderRoot implements ControlValueAccessor, UseSliderReturn {
  /** The id of the slider. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The element ids for the slider parts. */
  readonly elementIds: InputSignal<SliderElementIds | undefined> = input<SliderElementIds | undefined>(undefined, {
    alias: 'ids',
  })
  /** The aria-label of each slider thumb. */
  readonly ariaLabel: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined, {
    alias: 'aria-label',
  })
  /** The id of the elements that label each slider thumb. */
  readonly ariaLabelledby: InputSignal<string[] | undefined> = input<string[] | undefined>(undefined, {
    alias: 'aria-labelledby',
  })
  /** The controlled value of the slider. */
  readonly value: ModelSignal<number[] | undefined> = model<number[] | undefined>(undefined)
  /** The initial value of the slider when uncontrolled. */
  readonly defaultValue: InputSignal<number[] | undefined> = input<number[] | undefined>(undefined)
  /** Whether the slider is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the slider is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the slider is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name associated with each slider thumb when used in a form. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the underlying input element. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The minimum value of the slider. */
  readonly min: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The maximum value of the slider. */
  readonly max: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The step value of the slider. */
  readonly step: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The minimum permitted steps between multiple thumbs. */
  readonly minStepsBetweenThumbs: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The orientation of the slider. */
  readonly orientation: InputSignal<'horizontal' | 'vertical' | undefined> = input<
    'horizontal' | 'vertical' | undefined
  >(undefined)
  /** The origin of the slider range. */
  readonly origin: InputSignal<'start' | 'center' | 'end' | undefined> = input<'start' | 'center' | 'end' | undefined>(
    undefined,
  )
  /** The alignment of the slider thumb relative to the track. */
  readonly thumbAlignment: InputSignal<SliderThumbAlignment | undefined> = input<SliderThumbAlignment | undefined>(
    undefined,
  )
  /** The slider thumb dimensions. */
  readonly thumbSize: InputSignal<{ width: number; height: number } | undefined> = input<
    { width: number; height: number } | undefined
  >(undefined)
  /** Controls how thumbs behave when they collide during pointer interactions. */
  readonly thumbCollisionBehavior: InputSignal<SliderThumbCollisionBehavior | undefined> = input<
    SliderThumbCollisionBehavior | undefined
  >(undefined)
  /** Function that returns a human-readable value for the slider thumb. */
  readonly getAriaValueText: InputSignal<((details: SliderValueTextDetails) => string) | undefined> = input<
    ((details: SliderValueTextDetails) => string) | undefined
  >(undefined)
  /** Emits when the slider value change is done. */
  readonly valueChangeEnd: OutputEmitterRef<SliderValueChangeDetails> = output<SliderValueChangeDetails>()
  /** Emits when the slider focused index changes. */
  readonly focusChange: OutputEmitterRef<SliderFocusChangeDetails> = output<SliderFocusChangeDetails>()

  private readonly _disabledFromForm = signal(false)
  private _pendingInternalWrites = 0
  private _hasExternalBinding = false
  private _hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<number[]>({
    value: this.value,
    setDisabled: (disabled) => this._disabledFromForm.set(disabled),
    componentName: 'ArkSliderRoot',
    hasExternalModelBinding: () => this._hasExternalBinding,
  })

  private readonly machine = useSlider({
    context: () => ({
      id: this.id(),
      ids: this.elementIds(),
      'aria-label': this.ariaLabel(),
      'aria-labelledby': this.ariaLabelledby(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      disabled: this.disabled() || this._disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      invalid: this.invalid() || undefined,
      name: this.name(),
      form: this.form(),
      min: this.min(),
      max: this.max(),
      step: this.step(),
      minStepsBetweenThumbs: this.minStepsBetweenThumbs(),
      orientation: this.orientation(),
      origin: this.origin(),
      thumbAlignment: this.thumbAlignment(),
      thumbSize: this.thumbSize(),
      thumbCollisionBehavior: this.thumbCollisionBehavior(),
      getAriaValueText: this.getAriaValueText(),
      onValueChange: (details: SliderValueChangeDetails) => {
        if (!arraysShallowEqual(this.value(), details.value)) {
          this._pendingInternalWrites++
          this.value.set(details.value)
        }
        this.cva.notifyValueChange(details.value)
      },
      onValueChangeEnd: (details: SliderValueChangeDetails) => {
        this.valueChangeEnd.emit(details)
        this.cva.markTouched()
      },
      onFocusChange: (details: SliderFocusChangeDetails) => {
        this.focusChange.emit(details)
        if (details.focusedIndex === -1) {
          this.cva.markTouched()
        }
      },
    }),
  })

  readonly state: Signal<slider.Service['state']> = this.machine.state
  readonly api: Signal<slider.Api> = this.machine.api
  readonly service: slider.Service = this.machine.service
  readonly send: slider.Service['send'] = this.machine.send

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

  writeValue(value: number[] | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (!this._hasReceivedFormWrite && current !== undefined) {
      this._hasExternalBinding = true
    }
    this._hasReceivedFormWrite = true
    if (!arraysShallowEqual(current, next)) {
      this._pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: number[] | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}
