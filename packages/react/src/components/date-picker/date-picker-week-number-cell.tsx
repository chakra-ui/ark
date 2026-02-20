import type { DateValue, WeekNumberCellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps {
  weekIndex: number
  week: DateValue[]
}
export interface DatePickerWeekNumberCellProps extends HTMLProps<'td'>, DatePickerWeekNumberCellBaseProps {}

const splitWeekNumberCellProps = createSplitProps<WeekNumberCellProps>()

export const DatePickerWeekNumberCell = forwardRef<HTMLTableCellElement, DatePickerWeekNumberCellProps>(
  (props, ref) => {
    const [cellProps, localProps] = splitWeekNumberCellProps(props, ['weekIndex', 'week'])
    const datePicker = useDatePickerContext()
    const mergedProps = mergeProps(datePicker.getWeekNumberCellProps(cellProps), localProps)

    return <ark.td {...mergedProps} ref={ref} />
  },
)

DatePickerWeekNumberCell.displayName = 'DatePickerWeekNumberCell'
