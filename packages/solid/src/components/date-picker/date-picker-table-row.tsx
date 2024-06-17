import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-props-context'

export interface DatePickerTableRowBaseProps extends PolymorphicProps<'tr'> {}
export interface DatePickerTableRowProps
  extends JSX.HTMLAttributes<HTMLTableRowElement>,
    DatePickerTableRowBaseProps {}

export const DatePickerTableRow = (props: DatePickerTableRowProps) => {
  const api = useDatePickerContext()
  const tableProps = useDatePickerTableContext()
  const mergedProps = mergeProps(() => api().getTableRowProps(tableProps), props)

  return <ark.tr {...mergedProps} />
}
