import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTableContext } from './use-date-picker-table-props-context.ts'

export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps<'th'> {}
export interface DatePickerWeekNumberHeaderCellProps extends HTMLProps<'th'>, DatePickerWeekNumberHeaderCellBaseProps {}

export const DatePickerWeekNumberHeaderCell = (props: DatePickerWeekNumberHeaderCellProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getWeekNumberHeaderCellProps(tableProps), props)

  return <ark.th {...mergedProps} />
}
