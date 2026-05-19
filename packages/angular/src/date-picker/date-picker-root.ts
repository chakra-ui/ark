import type * as datePicker from '@zag-js/date-picker'
import {
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injector,
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
  type ProviderToken,
  type Signal,
} from '@angular/core'
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import { buildRootCarrier, createArkCvaController } from '@ark-ui/angular/src/internal'
import type { ArkContextCarrier } from '@ark-ui/angular/src/internal'
import type {
  DatePickerElementIds,
  DatePickerFocusChangeDetails,
  DatePickerIntlTranslations,
  DatePickerOpenChangeDetails,
  DatePickerPositioningOptions,
  DatePickerSelectionMode,
  DatePickerValueChangeDetails,
  DatePickerView,
  DatePickerViewChangeDetails,
  DatePickerVisibleRangeChangeDetails,
  DateValue,
} from './date-picker.types'
import { ARK_DATE_PICKER_CONTEXT, ARK_DATE_PICKER_CONTEXT_CARRIER, isDatePickerView } from './use-date-picker-context'
import { useDatePicker, type UseDatePickerReturn } from './use-date-picker'

@Directive({
  selector: '[arkDatePicker]',
  standalone: true,
  exportAs: 'arkDatePicker',
  providers: [
    { provide: ARK_DATE_PICKER_CONTEXT, useExisting: forwardRef(() => ArkDatePickerRoot) },
    {
      provide: ARK_DATE_PICKER_CONTEXT_CARRIER,
      useFactory: (root: ArkDatePickerRoot) => root.getContextCarrier(),
      deps: [forwardRef(() => ArkDatePickerRoot)],
    },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ArkDatePickerRoot), multi: true },
  ],
})
export class ArkDatePickerRoot implements ControlValueAccessor, UseDatePickerReturn {
  /** The unique identifier of the date picker. */
  readonly id: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The ids of the date picker elements. Useful for composition. */
  readonly ids: InputSignal<Partial<DatePickerElementIds> | undefined> = input<
    Partial<DatePickerElementIds> | undefined
  >(undefined)
  /** The controlled selected date(s). */
  readonly value: ModelSignal<DateValue[] | undefined> = model<DateValue[] | undefined>(undefined)
  /** The initial selected date(s) when uncontrolled. */
  readonly defaultValue: InputSignal<DateValue[] | undefined> = input<DateValue[] | undefined>(undefined)
  /** The controlled focused date. */
  readonly focusedValue: ModelSignal<DateValue | undefined> = model<DateValue | undefined>(undefined)
  /** The initial focused date when uncontrolled. */
  readonly defaultFocusedValue: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The controlled calendar view. */
  readonly view: ModelSignal<DatePickerView | undefined> = model<DatePickerView | undefined>(undefined)
  /** The initial calendar view when uncontrolled. */
  readonly defaultView: InputSignal<DatePickerView | undefined> = input<DatePickerView | undefined>(undefined)
  /** The controlled open state. Use property or two-way binding, not a bare static attribute. */
  readonly open: ModelSignal<boolean | undefined> = model<boolean | undefined>(undefined)
  /** The initial open state when uncontrolled. */
  readonly defaultOpen: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to render the calendar inline. */
  readonly inline: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date picker is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date picker is read-only. */
  readonly readOnly: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date picker is required. */
  readonly required: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the date picker is invalid. */
  readonly invalid: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether dates outside the visible range can be selected. */
  readonly outsideDaySelectable: InputSignalWithTransform<boolean, unknown> = input(false, {
    transform: booleanAttribute,
  })
  /** Whether the calendar should close after date selection is complete. */
  readonly closeOnSelect: InputSignalWithTransform<boolean, unknown> = input(true, { transform: booleanAttribute })
  /** Whether to open the calendar when the input is clicked. */
  readonly openOnClick: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether the calendar should render a fixed number of weeks. */
  readonly fixedWeeks: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** Whether to show the week number column. */
  readonly showWeekNumbers: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The minimum selectable date. */
  readonly min: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The maximum selectable date. */
  readonly max: InputSignal<DateValue | undefined> = input<DateValue | undefined>(undefined)
  /** The minimum view of the calendar. */
  readonly minView: InputSignal<DatePickerView | undefined> = input<DatePickerView | undefined>(undefined)
  /** The maximum view of the calendar. */
  readonly maxView: InputSignal<DatePickerView | undefined> = input<DatePickerView | undefined>(undefined)
  /** The number of months to display. */
  readonly numOfMonths: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The first day of the week, where 0 is Sunday. */
  readonly startOfWeek: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The date picker selection mode. */
  readonly selectionMode: InputSignal<DatePickerSelectionMode | undefined> = input<DatePickerSelectionMode | undefined>(
    undefined,
  )
  /** The maximum number of selectable dates in multiple selection mode. */
  readonly maxSelectedDates: InputSignal<number | undefined> = input<number | undefined>(undefined)
  /** The locale used to format dates. */
  readonly locale: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The time zone used to format dates. */
  readonly timeZone: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The localized strings for the date picker. */
  readonly translations: InputSignal<DatePickerIntlTranslations | undefined> = input<
    DatePickerIntlTranslations | undefined
  >(undefined)
  /** The name attribute of the input element. */
  readonly name: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The placeholder text for the input. */
  readonly placeholder: InputSignal<string | undefined> = input<string | undefined>(undefined)
  /** The date formatting function. */
  readonly format: InputSignal<datePicker.Props['format'] | undefined> = input<datePicker.Props['format'] | undefined>(
    undefined,
  )
  /** The date parsing function. */
  readonly parse: InputSignal<datePicker.Props['parse'] | undefined> = input<datePicker.Props['parse'] | undefined>(
    undefined,
  )
  /** Function that creates a calendar object for a calendar identifier. */
  readonly createCalendar: InputSignal<datePicker.Props['createCalendar'] | undefined> = input<
    datePicker.Props['createCalendar'] | undefined
  >(undefined)
  /** Returns whether a date is unavailable. */
  readonly isDateUnavailable: InputSignal<datePicker.Props['isDateUnavailable'] | undefined> = input<
    datePicker.Props['isDateUnavailable'] | undefined
  >(undefined)
  /** The positioning options for the date picker content. */
  readonly positioning: InputSignal<DatePickerPositioningOptions | undefined> = input<
    DatePickerPositioningOptions | undefined
  >(undefined)

  /** Emits details when the selected value changes. */
  readonly valueDetailsChange: OutputEmitterRef<DatePickerValueChangeDetails> = output<DatePickerValueChangeDetails>()
  /** Emits details when the focused date changes. */
  readonly focusChange: OutputEmitterRef<DatePickerFocusChangeDetails> = output<DatePickerFocusChangeDetails>()
  /** Emits details when the calendar view changes. */
  readonly viewDetailsChange: OutputEmitterRef<DatePickerViewChangeDetails> = output<DatePickerViewChangeDetails>()
  /** Emits details when the visible range changes. */
  readonly visibleRangeChange: OutputEmitterRef<DatePickerVisibleRangeChangeDetails> =
    output<DatePickerVisibleRangeChangeDetails>()
  /** Emits details when the open state changes. */
  readonly openDetailsChange: OutputEmitterRef<DatePickerOpenChangeDetails> = output<DatePickerOpenChangeDetails>()

  private readonly disabledFromForm = signal(false)
  private pendingInternalWrites = 0
  private hasExternalBinding = false
  private hasReceivedFormWrite = false

  private readonly cva = createArkCvaController<DateValue[]>({
    value: this.value,
    setDisabled: (disabled) => this.disabledFromForm.set(disabled),
    componentName: 'ArkDatePickerRoot',
    hasExternalModelBinding: () => this.hasExternalBinding,
  })

  private readonly machine = useDatePicker({
    context: () => ({
      id: this.id(),
      ids: this.ids(),
      value: this.value(),
      defaultValue: this.defaultValue(),
      focusedValue: this.focusedValue(),
      defaultFocusedValue: this.defaultFocusedValue(),
      view: this.normalizedView(),
      defaultView: this.defaultView(),
      open: this.normalizedOpen(),
      defaultOpen: this.defaultOpen(),
      inline: this.inline() || undefined,
      disabled: this.disabled() || this.disabledFromForm() || undefined,
      readOnly: this.readOnly() || undefined,
      required: this.required() || undefined,
      invalid: this.invalid() || undefined,
      outsideDaySelectable: this.outsideDaySelectable() || undefined,
      closeOnSelect: this.closeOnSelect(),
      openOnClick: this.openOnClick() || undefined,
      fixedWeeks: this.fixedWeeks() || undefined,
      showWeekNumbers: this.showWeekNumbers() || undefined,
      min: this.min(),
      max: this.max(),
      minView: this.minView(),
      maxView: this.maxView(),
      numOfMonths: this.numOfMonths(),
      startOfWeek: this.startOfWeek(),
      selectionMode: this.selectionMode(),
      maxSelectedDates: this.maxSelectedDates(),
      locale: this.locale(),
      timeZone: this.timeZone(),
      translations: this.translations(),
      name: this.name(),
      placeholder: this.placeholder(),
      format: this.format(),
      parse: this.parse(),
      createCalendar: this.createCalendar(),
      isDateUnavailable: this.isDateUnavailable(),
      positioning: this.positioning(),
      onValueChange: (details) => {
        if (!dateValueArraysEqual(this.value(), details.value)) {
          this.pendingInternalWrites++
          this.value.set([...details.value])
        }
        this.cva.notifyValueChange(details.value)
        this.cva.markTouched()
        this.valueDetailsChange.emit(details)
      },
      onFocusChange: (details) => {
        if (!dateValuesEqual(this.focusedValue(), details.focusedValue)) {
          this.focusedValue.set(details.focusedValue)
        }
        this.focusChange.emit(details)
      },
      onViewChange: (details) => {
        if (this.view() !== details.view) {
          this.view.set(details.view)
        }
        this.viewDetailsChange.emit(details)
      },
      onVisibleRangeChange: (details) => {
        this.visibleRangeChange.emit(details)
      },
      onOpenChange: (details) => {
        if (this.normalizedOpen() !== details.open) {
          this.open.set(details.open)
        }
        if (!details.open) {
          this.cva.markTouched()
        }
        this.openDetailsChange.emit(details)
      },
    }),
  })

  readonly state: Signal<datePicker.Service['state']> = this.machine.state
  readonly api: Signal<datePicker.Api> = this.machine.api
  readonly service: datePicker.Service = this.machine.service
  readonly send: datePicker.Service['send'] = this.machine.send

  protected readonly arkContextCarrier: ArkContextCarrier<ArkDatePickerRoot> = buildRootCarrier<ArkDatePickerRoot>({
    root: this,
    rootToken: ARK_DATE_PICKER_CONTEXT as ProviderToken<ArkDatePickerRoot>,
    originInjector: inject(Injector),
    environmentInjector: inject(EnvironmentInjector),
  })

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

  /** @internal Exposed for date picker part directives to consume via ARK_DATE_PICKER_CONTEXT_CARRIER. */
  getContextCarrier(): ArkContextCarrier<ArkDatePickerRoot> {
    return this.arkContextCarrier
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

  private normalizedOpen(): boolean | undefined {
    const value = this.open()
    return typeof value === 'boolean' ? value : undefined
  }

  private normalizedView(): DatePickerView | undefined {
    const value = this.view()
    return isDatePickerView(value) ? value : undefined
  }
}

function dateValuesEqual(a: DateValue | undefined, b: DateValue | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  return String(a) === String(b)
}

function dateValueArraysEqual(a: DateValue[] | undefined, b: DateValue[] | undefined): boolean {
  if (a === b) return true
  if (!a || !b) return false
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (!dateValuesEqual(a[i], b[i])) return false
  }
  return true
}
