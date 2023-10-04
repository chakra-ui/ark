import type { TableProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useDatePickerContext } from './date-picker-context'
import { DatePickerTableProvider } from './date-picker-table-context'

export interface DatePickerTableProps extends Assign<HTMLArkProps<'table'>, TableProps> {}

/**
 *  view?: DateView;
    columns?: number;
    id?: string;
 */
export const DatePickerTable = forwardRef<HTMLTableElement, DatePickerTableProps>((props, ref) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(api.getTableProps({}), props)
  const tableProps = { columns: 0 }

  return (
    <DatePickerTableProvider value={tableProps}>
      <ark.table {...mergedProps} ref={ref} />
    </DatePickerTableProvider>
  )
})

DatePickerTable.displayName = 'DatePickerTable'
