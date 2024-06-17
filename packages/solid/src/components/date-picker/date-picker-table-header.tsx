import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeaderBaseProps extends PolymorphicProps<'th'> {}
export interface DatePickerTableHeaderProps
  extends HTMLProps<'th'>,
    DatePickerTableHeaderBaseProps {}

export const DatePickerTableHeader = (props: DatePickerTableHeaderProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableHeaderProps(tableProps), props)

  return <ark.th {...mergedProps} />
}
