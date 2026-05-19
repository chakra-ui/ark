import {
  DestroyRef,
  Directive,
  ElementRef,
  Renderer2,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  type InputSignal,
  type InputSignalWithTransform,
} from '@angular/core'
import { applyArkProps } from '@ark-ui/angular/src/_zag'
import type {
  DatePickerDayTableCellProps,
  DatePickerTableCellMachineProps,
  DatePickerVisibleRange,
  DateValue,
} from './date-picker.types'
import {
  ARK_DATE_PICKER_TABLE_CELL_CONTEXT,
  injectArkDatePickerContext,
  injectArkDatePickerTableContext,
  injectArkDatePickerViewContext,
} from './use-date-picker-context'

@Directive({
  selector: '[arkDatePickerTableCell]',
  standalone: true,
  exportAs: 'arkDatePickerTableCell',
  providers: [
    {
      provide: ARK_DATE_PICKER_TABLE_CELL_CONTEXT,
      useFactory: (cell: ArkDatePickerTableCell) => cell.getTableCellContext(),
      deps: [forwardRef(() => ArkDatePickerTableCell)],
    },
  ],
})
export class ArkDatePickerTableCell {
  /** The date, month, or year value represented by this cell. */
  readonly value: InputSignal<DateValue | number> = input.required<DateValue | number>()
  /** Whether the cell is disabled. */
  readonly disabled: InputSignalWithTransform<boolean, unknown> = input(false, { transform: booleanAttribute })
  /** The day-view visible range for the cell. */
  readonly visibleRange: InputSignal<DatePickerVisibleRange | undefined> = input<DatePickerVisibleRange | undefined>(
    undefined,
  )
  /** The number of columns in the month/year grid. */
  readonly columns: InputSignal<number | undefined> = input<number | undefined>(undefined)

  private readonly view = injectArkDatePickerViewContext()
  private readonly table = injectArkDatePickerTableContext()
  private readonly cellContext = computed(() => {
    const value = this.value()
    if (this.view().view === 'day') {
      return {
        value: value as DateValue,
        disabled: this.disabled(),
        visibleRange: this.visibleRange(),
      } satisfies DatePickerDayTableCellProps
    }
    return {
      value: value as number,
      disabled: this.disabled(),
      columns: this.columns() ?? this.table().columns,
    } satisfies DatePickerTableCellMachineProps
  })

  constructor() {
    const context = injectArkDatePickerContext()
    applyArkProps({
      elementRef: inject(ElementRef),
      renderer: inject(Renderer2),
      destroyRef: inject(DestroyRef),
      props: () => {
        const api = context.api()
        const props = this.cellContext()
        const view = this.view().view
        if (view === 'day') return api.getDayTableCellProps(props as DatePickerDayTableCellProps)
        if (view === 'month') return api.getMonthTableCellProps(props as DatePickerTableCellMachineProps)
        return api.getYearTableCellProps(props as DatePickerTableCellMachineProps)
      },
    })
  }

  /** @internal Exposed for table-cell-scoped date picker directives. */
  getTableCellContext(): typeof this.cellContext {
    return this.cellContext
  }
}
