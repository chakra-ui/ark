import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTableContext } from './use-date-picker-table-props-context.ts'

export interface DatePickerTableHeadBaseProps extends PolymorphicProps<'thead'> {}
export interface DatePickerTableHeadProps extends HTMLProps<'thead'>, DatePickerTableHeadBaseProps {}

export const DatePickerTableHead = (props: DatePickerTableHeadProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableHeadProps(tableProps), props)

  return <ark.thead {...mergedProps} />
}
