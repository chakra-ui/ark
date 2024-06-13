import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export type DatePickerTableHeaderBaseProps = {}
export interface DatePickerTableHeaderProps
  extends HTMLArkProps<'th'>,
    DatePickerTableHeaderBaseProps {}

export const DatePickerTableHeader = forwardRef<HTMLTableCellElement, DatePickerTableHeaderProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getTableHeaderProps(tableProps), props)

    return <ark.th {...mergedProps} ref={ref} />
  },
)

DatePickerTableHeader.displayName = 'DatePickerTableHeader'
