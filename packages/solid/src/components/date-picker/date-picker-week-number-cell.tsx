import type { DateValue, WeekNumberCellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import type { JSX } from 'solid-js'

export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps<'td'> {
  weekIndex: number
  week: DateValue[]
}
export interface DatePickerWeekNumberCellProps extends HTMLProps<'td'>, DatePickerWeekNumberCellBaseProps {
  children?: JSX.Element
}

const splitWeekNumberCellProps = createSplitProps<WeekNumberCellProps>()

export const DatePickerWeekNumberCell = (props: DatePickerWeekNumberCellProps) => {
  const [cellProps, localProps] = splitWeekNumberCellProps(props, ['weekIndex', 'week'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getWeekNumberCellProps(cellProps), localProps)

  return <ark.td {...mergedProps} />
}
