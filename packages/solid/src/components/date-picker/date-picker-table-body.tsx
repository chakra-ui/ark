import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-props-context'

export interface DatePickerTableBodyBaseProps extends PolymorphicProps<'tbody'> {}
export interface DatePickerTableBodyProps
  extends HTMLProps<'tbody'>,
    DatePickerTableBodyBaseProps {}

export const DatePickerTableBody = (props: DatePickerTableBodyProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableBodyProps(tableProps), props)

  return <ark.tbody {...mergedProps} />
}
