import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableRowProps extends HTMLArkProps<'tr'> {}

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableRowProps(tableProps), props)

  return <ark.tr {...mergedProps} />
}
