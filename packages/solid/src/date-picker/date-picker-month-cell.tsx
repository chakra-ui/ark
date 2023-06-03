import type { CellProps } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { DatePickerCellProvider } from './date-picker-cell-context'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthCellProps = Assign<HTMLArkProps<'div'>, CellProps>

export const DatePickerMonthCell = (props: DatePickerMonthCellProps) => {
  const [cellProps, localProps] = createSplitProps<CellProps>()(props, ['value', 'disabled'])
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getMonthCellProps(cellProps), localProps)

  return (
    <DatePickerCellProvider value={cellProps}>
      <ark.div {...mergedProps} />
    </DatePickerCellProvider>
  )
}
