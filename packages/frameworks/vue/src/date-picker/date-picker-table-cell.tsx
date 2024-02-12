import { computed, defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import {
  DatePickerTableCellProvider,
  type DatePickerTableCellContext,
} from './date-picker-table-cell-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerTableCellProps extends HTMLArkProps<'td'>, DatePickerTableCellContext {}

export const DatePickerTableCell = defineComponent<DatePickerTableCellProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()
    // @ts-ignore
    DatePickerTableCellProvider(reactive(props))

    const tableCellProps = computed(() => {
      return {
        day: api.value.getDayTableCellProps,
        month: api.value.getMonthTableCellProps,
        year: api.value.getYearTableCellProps,
        // @ts-expect-error use filter guard
      }[view.view](props)
    })

    return () => (
      <ark.td {...tableCellProps.value} {...attrs}>
        {slots.default?.(api.value)}
      </ark.td>
    )
  },
  {
    name: 'DatePickerTableCell',
    props: {
      columns: {
        type: Number as PropType<DatePickerTableCellContext['columns']>,
      },
      disabled: {
        type: Boolean as PropType<DatePickerTableCellContext['disabled']>,
      },
      value: {
        type: [Number, Object] as PropType<DatePickerTableCellContext['value']>,
        required: true,
      },
      visibleRange: {
        type: Object as PropType<DatePickerTableCellContext['visibleRange']>,
      },
    },
  },
)
