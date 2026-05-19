import type * as dateInput from '@zag-js/date-input'
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
  DateInputElementIds,
  DateInputFocusChangeDetails,
  DateInputFormatDateDetails,
  DateInputIntlTranslations,
  DateInputPlaceholderChangeDetails,
  DateInputSelectionMode,
  DateInputSegments,
  DateInputValueChangeDetails,
  DateValue,
} from './date-input.types'
import { ARK_DATE_INPUT_CONTEXT } from './use-date-input-context'
import { useDateInput, type UseDateInputReturn } from './use-date-input'

@Directive({
  selector: '[arkDateInput]',
  standalone: true,
  exportAs: 'arkDateInput',
  providers: [
    { provide: ARK_DATE_INPUT_CONTEXT, useExisting: forwardRef(() => ArkDateInputRoot) },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkDateInputRoot), multi: true },
  ],
})
export class ArkDateInputRoot implements ControlValueAccessor, UseDateInputReturn {
  /** The unique identifier of the date input. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the date input elements. Useful for composition. */
  readonly ids: InputSignal<Partial<DateInputElementIds> | undefined> = input<Partial<DateInputElementIds> | undefined>(
    undefined,
  )
  /** The controlled selected date(s). */
  readonly value: ModelSignal<DateValue[] | undefined> = model<DateValue[] | undefined>(undefined)
  /** The initial selected date(s) when uncontrolled. */
  readonly defaultValue: InputSignal<DateValue[] | undefined> = input<DateValue[] | undefined>(undefined)
  /** The controlled placeholder date. */
  readonly placeholderValue: ModelSignal<DateValue | undefined> = model<DateValue | undefined>(undefined)
  /** The initial placeholder date when uncontrolled. */
  readonly defaultPlaceholderValue: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The minimum date that can be selected. */
  readonly min: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The maximum date that can be selected. */
  readonly max: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The date input selection mode. */
  readonly selectionMode: InputSignal<DateInputSelectionMode | undefined> = input<DateInputSelectionMode | undefined>(
    undefined,
  )
  /** The smallest unit displayed in the date input. */
  readonly granularity: InputSignal<dateInput.Props['granularity'] | undefined> = input<
    dateInput.Props['granularity'] | undefined
  >(undefined)
  /** Whether to use 12-hour or 24-hour time format. */
  readonly hourCycle: InputSignal<dateInput.Props['hourCycle'] | undefined> = input<
    dateInput.Props['hourCycle'] | undefined
  >(undefined)
  /** The locale used to format date segments. */
  readonly locale: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The time zone used to format date segments. */
  readonly timeZone: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The localized strings for the date input. */
  readonly translations: InputSignal<DateInputIntlTranslations | undefined> = input<
    DateInputIntlTranslations | undefined
  >(undefined)
  /** The date formatter to use. */
  readonly formatter: InputSignal<dateInput.Props['formatter'] | undefined> = input<
    dateInput.Props['formatter'] | undefined
  >(undefined)
  /** The computed segments map for the formatter. */
  readonly allSegments: InputSignal<DateInputSegments | undefined> = input<DateInputSegments | undefined>(undefined)
  /** The format function for converting a DateValue to a string. */
  readonly format: InputSignal<((date: DateValue, details: DateInputFormatDateDetails) => string) | undefined> = input<
    ((date: DateValue, details: DateInputFormatDateDetails) => string) | undefined
  >(undefined)
  /** Function that creates a calendar object for a calendar identifier. */
  readonly createCalendar: InputSignal<dateInput.Props['createCalendar'] | undefined> = input<
    dateInput.Props['createCalendar'] | undefined
  >(undefined)
  /** Returns whether a date is unavailable. */
  readonly isDateUnavailable: InputSignal<dateInput.Props['isDateUnavailable'] | undefined> = input<
    dateInput.Props['isDateUnavailable'] | undefined
  >(undefined)
  /** Whether to always show leading zeros in numeric fields. */
  readonly shouldForceLeadingZeros: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether the date input is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date input is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date input is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date input is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The name attribute of the hidden input. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The associated form of the hidden input. */
  readonly form: InputSignal<string | undefined> = input<string | undefined>(undefined)

  /** Emits when the focused segment changes. */
  readonly focusChange: OutputEmitterRef<DateInputFocusChangeDetails> = output<DateInputFocusChangeDetails>()
  /** Emits when the placeholder date changes. */
  readonly placeholderChange: OutputEmitterRef<DateInputPlaceholderChangeDetails> =
    output<DateInputPlaceholderChangeDetails>()
  /** Emits details when the selected value changes. */
  readonly valueDetailsChange: OutputEmitterRef<DateInputValueChangeDetails> = output<DateInputValueChangeDetails>()

  private readonly disabledFromForm = signal(false)
  private pendingInternalWrites = 0
  private hasExternalBinding = false
  private hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<DateValue[]>({
    value: this.value,
    setDisabled: (disabled) => this.disabledFromForm.set(disabled),
    componentName: 'ArkDateInputRoot',
    hasExternalModelBinding: () => this.hasExternalBinding,
  })

  private readonly machine = useDateInput({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      placeholderValue: this.placeholderValue(),
      defaultPlaceholderValue: this.defaultPlaceholderValue(),
      min: this.min(),
      max: this.max(),
      selectionMode: this.selectionMode(),
      granularity: this.granularity(),
      hourCycle: this.hourCycle(),
      locale: this.locale(),
      timeZone: this.timeZone(),
      translations: this.translations(),
      formatter: this.formatter(),
      allSegments: this.allSegments(),
      format: this.format(),
      createCalendar: this.createCalendar(),
      isDateUnavailable: this.isDateUnavailable(),
      shouldForceLeadingZeros: this.shouldForceLeadingZeros() || undefined,
      disabled: this.disabled() || this.disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      invalid: this.invalid() || undefined,
      name: this.name(),
      form: this.form(),
      onValueChange: (details) => {
        if (!dateValueArraysEqual(this.value(), details.value)) {
          this.pendingInternalWrites++
          this.value.set([...details.value])
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
        this.valueDetailsChange.emit(details)
      },
      onPlaceholderChange: (details) => {
        if (!dateValuesEqual(this.placeholderValue(), details.placeholderValue)) {
          this.placeholderValue.set(details.placeholderValue)
        }
        this.placeholderChange.emit(details)
      },
      onFocusChange: (details) => {
        if (!details.focused) {
          this.cva.markTouched()
        }
        this.focusChange.emit(details)
      },
    }),
  })

  readonly state: Signal<dateInput.Service['state']> = this.machine.state
  readonly api: Signal<dateInput.Api> = this.machine.api
  readonly service: dateInput.Service = this.machine.service
  readonly send: dateInput.Service['send'] = this.machine.send

  constructor() {
    let firstRun = true
    effect(() => {
      void this.value()
      if (firstRun) {
        firstRun = false
        this.pendingInternalWrites = 0
        return
      }
      if (this.pendingInternalWrites > 0) {
        this.pendingInternalWrites--
        return
      }
      this.hasExternalBinding = true
    })

    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => this.api().getRootProps(),
    })
  }

  writeValue(value: DateValue[] | null): void {
    const next = value === null ? undefined : value
    const current = this.value()
    if (!this.hasReceivedFormWrite && current !== undefined) {
      this.hasExternalBinding = true
    }
    this.hasReceivedFormWrite = true
    if (current !== next) {
      this.pendingInternalWrites++
    }
    this.cva.writeValue(value)
  }

  registerOnChange(fn: (value: DateValue[] | undefined) => void): void {
    this.cva.registerOnChange(fn)
  }

  registerOnTouched(fn: () => void): void {
    this.cva.registerOnTouched(fn)
  }

  setDisabledState(disabled: boolean): void {
    this.cva.setDisabledState(disabled)
  }
}

function dateValueArraysEqual(a: DateValue[] | undefined, b: DateValue[] | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (String(a[i]) !== String(b[i])) return false
  }
  return true
}

function dateValuesEqual(a: DateValue | undefined, b: DateValue | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  return String(a) === String(b)
}
