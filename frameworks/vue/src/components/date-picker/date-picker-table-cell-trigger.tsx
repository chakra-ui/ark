import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellContext } from './use-date-picker-table-cell-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerTableCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTableCellTrigger = defineComponent<DatePickerTableCellTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useDatePickerContext()
    const cell = useDatePickerTableCellContext()
    const view = useDatePickerViewContext()

    const triggerProps = computed(() => {
      return {
        day: api.value.getDayTableCellTriggerProps,
        month: api.value.getMonthTableCellTriggerProps,
        year: api.value.getYearTableCellTriggerProps,
        // @ts-expect-error use filter guard
      }[view.view](cell)
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
