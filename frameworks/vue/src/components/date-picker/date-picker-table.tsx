import type { TableProps } from '@zag-js/date-picker'
import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { useId } from '../../utils'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

export const DatePickerTable = defineComponent<DatePickerTableProps>(
  (props, { slots, attrs }) => {
    const api = useDatePickerContext()
    const viewProps = useDatePickerViewPropsContext()
    DatePickerTablePropsProvider({ ...props, id: useId().value, ...viewProps })

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
