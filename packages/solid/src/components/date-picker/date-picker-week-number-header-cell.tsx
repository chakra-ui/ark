import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-props-context'

export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps<'th'> {}
export interface DatePickerWeekNumberHeaderCellProps extends HTMLProps<'th'>, DatePickerWeekNumberHeaderCellBaseProps {}

export const DatePickerWeekNumberHeaderCell = (props: DatePickerWeekNumberHeaderCellProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getWeekNumberHeaderCellProps(tableProps), props)

  return <ark.th {...mergedProps} />
}
