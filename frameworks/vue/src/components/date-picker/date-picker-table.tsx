import type { TableProps } from '@zag-js/date-picker'
import { type PropType, defineComponent, reactive } from 'vue'
import type { Assign } from '../../types'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTableProvider } from './use-date-picker-table-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

export const DatePickerTable = defineComponent<DatePickerTableProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    const view = useDatePickerViewContext()
    DatePickerTableProvider(reactive({ ...props, id: useId().value, ...view }))

    return () => (
      <ark.table {...api.value.getTableProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.table>
    )
  },
  {
    name: 'DatePickerTable',
    props: {
      columns: {
        type: Number as PropType<TableProps['columns']>,
      },
    },
  },
)
