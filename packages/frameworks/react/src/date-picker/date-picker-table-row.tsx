import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableRowProps extends HTMLArkProps<'tr'> {}

export const DatePickerTableRow = forwardRef<HTMLTableRowElement, DatePickerTableRowProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const tableContext = useDatePickerTableContext()
    const mergedProps = mergeProps(context.getTableRowProps(tableContext), props)

    return <ark.tr {...mergedProps} ref={ref} />
  },
)

DatePickerTableRow.displayName = 'DatePickerTableRow'
