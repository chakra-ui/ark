import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'th'> {}

export const DatePickerTableHeader = forwardRef<HTMLTableCellElement, DatePickerTableHeaderProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const tableContext = useDatePickerTableContext()
    const mergedProps = mergeProps(context.getTableHeaderProps(tableContext), props)

    return <ark.th {...mergedProps} ref={ref} />
  },
)

DatePickerTableHeader.displayName = 'DatePickerTableHeader'
