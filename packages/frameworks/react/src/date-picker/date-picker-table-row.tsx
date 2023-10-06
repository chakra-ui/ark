import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableContext } from './date-picker-table-context'

export interface DatePickerTableRowProps extends HTMLArkProps<'tr'> {}

export const DatePickerTableRow = forwardRef<HTMLTableRowElement, DatePickerTableRowProps>(
  (props, ref) => {
    const api = useDatePickerContext()
    const tableProps = useDatePickerTableContext()
    const mergedProps = mergeProps(api.getTableRowProps(tableProps), props)

    return <ark.tr {...mergedProps} ref={ref} />
  },
)

DatePickerTableRow.displayName = 'DatePickerTableRow'
