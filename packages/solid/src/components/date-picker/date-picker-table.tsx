import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createUniqueId } from 'solid-js'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTableProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

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
