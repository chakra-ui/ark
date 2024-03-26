import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableContext } from './use-date-picker-table-context'

export interface DatePickerTableBodyProps extends HTMLArkProps<'tbody'> {}

export const DatePickerTableBody = forwardRef<HTMLTableSectionElement, DatePickerTableBodyProps>(
  (props, ref) => {
    const context = useDatePickerContext()
    const tableProps = useDatePickerTableContext()
    const mergedProps = mergeProps(context.getTableBodyProps(tableProps), props)

    return <ark.tbody {...mergedProps} ref={ref} />
  },
)

DatePickerTableBody.displayName = 'DatePickerTableBody'
