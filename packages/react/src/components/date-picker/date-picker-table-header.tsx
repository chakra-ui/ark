import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeaderBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeaderProps
  extends HTMLProps<'th'>,
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
