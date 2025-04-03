import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTableProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableBaseProps extends Pick<TableProps, 'columns'>, PolymorphicProps<'table'> {}
export interface DatePickerTableProps extends HTMLProps<'table'>, DatePickerTableBaseProps {}

export const DatePickerTable = (props: DatePickerTableProps) => {
  const [columnProps, localProps] = createSplitProps<Pick<TableProps, 'columns'>>()(props, ['columns'])
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const id = createUniqueId()
  const tableProps = mergeProps(() => ({ columns: columnProps.columns, id }), viewProps)
  const mergedProps = mergeProps(() => api().getTableProps(tableProps), localProps)

  return (
    <DatePickerTableProvider value={tableProps}>
      <ark.table {...mergedProps} />
    </DatePickerTableProvider>
  )
}
