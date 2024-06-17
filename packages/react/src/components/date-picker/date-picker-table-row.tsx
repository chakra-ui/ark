import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableRowBaseProps extends PolymorphicProps {}
export interface DatePickerTableRowProps extends HTMLProps<'tr'>, DatePickerTableRowBaseProps {}

export const DatePickerTableRow = forwardRef<HTMLTableRowElement, DatePickerTableRowProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getTableRowProps(tableProps), props)

    return <ark.tr {...mergedProps} ref={ref} />
  },
)

DatePickerTableRow.displayName = 'DatePickerTableRow'
