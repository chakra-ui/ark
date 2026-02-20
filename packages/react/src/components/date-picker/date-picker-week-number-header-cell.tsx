import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps {}
export interface DatePickerWeekNumberHeaderCellProps extends HTMLProps<'th'>, DatePickerWeekNumberHeaderCellBaseProps {}

export const DatePickerWeekNumberHeaderCell = forwardRef<HTMLTableCellElement, DatePickerWeekNumberHeaderCellProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getWeekNumberHeaderCellProps(tableProps), props)

    return <ark.th {...mergedProps} ref={ref} />
  },
)

DatePickerWeekNumberHeaderCell.displayName = 'DatePickerWeekNumberHeaderCell'
