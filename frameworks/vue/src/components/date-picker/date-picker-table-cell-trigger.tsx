import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTableCellTrigger = defineComponent<DatePickerTableCellTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useDatePickerContext()
    const cellProps = useDatePickerTableCellPropsContext()
    const viewProps = useDatePickerViewPropsContext()

    const triggerProps = computed(() => {
      return {
        day: api.value.getDayTableCellTriggerProps,
        month: api.value.getMonthTableCellTriggerProps,
        year: api.value.getYearTableCellTriggerProps,
        // @ts-expect-error use filter guard
      }[viewProps.view](cellProps)
    })

    return () => (
      <ark.button {...triggerProps.value} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'DatePickerTableCellTrigger',
  },
)
