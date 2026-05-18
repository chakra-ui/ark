import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTableContext } from './use-date-picker-table-props-context.ts'

export interface DatePickerTableRowBaseProps extends PolymorphicProps<'tr'> {}
export interface DatePickerTableRowProps extends HTMLProps<'tr'>, DatePickerTableRowBaseProps {}

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableRowProps(tableProps), props)

  return <ark.tr {...mergedProps} />
}
