import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableHeadProps extends HTMLArkProps<'thead'> {}

export const DatePickerTableHead = (props: DatePickerTableHeadProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableHeadProps(tableProps), props)

  return <ark.thead {...mergedProps} />
}
