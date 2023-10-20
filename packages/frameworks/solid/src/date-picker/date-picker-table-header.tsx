import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'th'> {}

export const DatePickerTableHeader = (props: DatePickerTableHeaderProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableHeaderProps(tableProps), props)

  return <ark.th {...mergedProps} />
}
