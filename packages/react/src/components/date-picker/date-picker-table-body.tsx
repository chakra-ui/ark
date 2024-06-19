import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableBodyBaseProps extends PolymorphicProps {}
export interface DatePickerTableBodyProps
  extends HTMLProps<'tbody'>,
    DatePickerTableBodyBaseProps {}

export const DatePickerTableBody = forwardRef<HTMLTableSectionElement, DatePickerTableBodyProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getTableBodyProps(tableProps), props)

    return <ark.tbody {...mergedProps} ref={ref} />
  },
)

DatePickerTableBody.displayName = 'DatePickerTableBody'
