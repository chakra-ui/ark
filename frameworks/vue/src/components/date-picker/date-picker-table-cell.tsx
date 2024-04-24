import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import {
  type DatePickerTableCellPropsContext,
  DatePickerTableCellPropsProvider,
} from './use-date-picker-table-cell-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellProps
  extends HTMLArkProps<'td'>,
    DatePickerTableCellPropsContext {}

export const DatePickerTableCell = defineComponent<DatePickerTableCellProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    DatePickerTableCellPropsProvider(props)

    const tableCellProps = computed(() => {
      return {
        day: api.value.getDayTableCellProps,
        month: api.value.getMonthTableCellProps,
        year: api.value.getYearTableCellProps,
        // @ts-expect-error use filter guard
      }[viewProps.view](props)
    })

    return () => (
      <ark.td {...tableCellProps.value} {...attrs}>
        {slots.default?.()}
      </ark.td>
    )
  },
  {
    name: 'DatePickerTableCell',
    props: {
      columns: {
        type: Number as PropType<DatePickerTableCellPropsContext['columns']>,
      },
      disabled: {
        type: Boolean as PropType<DatePickerTableCellPropsContext['disabled']>,
      },
      value: {
        type: [Number, Object] as PropType<DatePickerTableCellPropsContext['value']>,
        required: true,
      },
      visibleRange: {
        type: Object as PropType<DatePickerTableCellPropsContext['visibleRange']>,
      },
    },
  },
)
