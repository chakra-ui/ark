import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef, useId } from 'react'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerTableProvider } from './date-picker-table-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerTableProps
  extends Assign<HTMLArkProps<'table'>, Pick<TableProps, 'columns'>> {}

export const DatePickerTable = forwardRef<HTMLTableElement, DatePickerTableProps>((props, ref) => {
  const [{ columns }, localProps] = createSplitProps<Pick<TableProps, 'columns'>>()(props, [
    'columns',
  ])
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const tableProps = { columns, id: useId(), ...viewProps }
  const mergedProps = mergeProps(api.getTableProps(tableProps), localProps)

  return (
    <DatePickerTableProvider value={tableProps}>
      <ark.table {...mergedProps} ref={ref} />
    </DatePickerTableProvider>
  )
})

DatePickerTable.displayName = 'DatePickerTable'
