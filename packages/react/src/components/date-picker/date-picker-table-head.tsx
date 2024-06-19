import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

export interface DatePickerTableHeadBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeadProps
  extends HTMLProps<'thead'>,
    DatePickerTableHeadBaseProps {}

export const DatePickerTableHead = forwardRef<HTMLTableSectionElement, DatePickerTableHeadProps>(
  (props, ref) => {
    const datePicker = useDatePickerContext()
    const tableProps = useDatePickerTablePropsContext()
    const mergedProps = mergeProps(datePicker.getTableHeadProps(tableProps), props)

    return <ark.thead {...mergedProps} ref={ref} />
  },
)

DatePickerTableHead.displayName = 'DatePickerTableHead'
