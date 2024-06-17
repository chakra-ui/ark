import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createUniqueId } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTableProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableBaseProps
  extends Pick<TableProps, 'columns'>,
    PolymorphicProps<'table'> {}
export interface DatePickerTableProps
  extends JSX.HTMLAttributes<HTMLTableElement>,
    DatePickerTableBaseProps {}

export const DatePickerTable = (props: DatePickerTableProps) => {
  const [{ columns }, localProps] = createSplitProps<Pick<TableProps, 'columns'>>()(props, [
    'columns',
  ])
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const tableProps = { columns, id: createUniqueId(), ...viewProps }
  const mergedProps = mergeProps(() => api().getTableProps(tableProps), localProps)

  return (
    <DatePickerTableProvider value={tableProps}>
      <ark.table {...mergedProps} />
    </DatePickerTableProvider>
  )
}
