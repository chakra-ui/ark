import type { TableProps } from '@zag-js/date-picker'
import { defineComponent, reactive, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useId } from '../utils'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerTableProvider } from './date-picker-table-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

export const DatePickerTable = defineComponent({
  name: 'DatePickerTable',
  props: {
    columns: {
      type: Number as PropType<TableProps['columns']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()
    DatePickerTableProvider(reactive({ ...props, id: useId().value, ...view }))

    return () => (
      <ark.table {...api.value.getTableProps(props)} {...attrs}>
        {slots.default?.(api)}
      </ark.table>
    )
  },
})
