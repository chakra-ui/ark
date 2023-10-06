import { mergeProps } from '@zag-js/solid'

import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableBodyProps extends HTMLArkProps<'tbody'> {}

export const DatePickerTableBody = (props: DatePickerTableBodyProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(api().getTableBodyProps(tableProps), props)

  return <ark.tbody {...mergedProps} />
}
