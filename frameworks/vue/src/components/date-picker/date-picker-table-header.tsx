import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'th'> {}

export const DatePickerTableHeader = defineComponent<DatePickerTableHeaderProps>(
  (_, { attrs, slots }) => {
    const api = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()

    return () => (
      <ark.th {...api.value.getTableHeaderProps(tableProps)} {...attrs}>
        {slots.default?.()}
      </ark.th>
    )
  },
  {
    name: 'DatePickerTableHeader',
  },
)
