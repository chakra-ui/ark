import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeaderProps extends HTMLArkProps<'th'> {}

export const DatePickerTableHeader = forwardRef<HTMLTableCellElement, DatePickerTableHeaderProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getTableHeaderProps(tableProps), props)

    return <ark.th {...mergedProps} ref={ref} />
  },
)

DatePickerTableHeader.displayName = 'DatePickerTableHeader'
