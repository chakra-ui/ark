import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import {
  DatePickerTableCellProvider,
  type UseDatePickerTableCellContext,
} from './use-date-picker-table-cell-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellBaseProps
  extends UseDatePickerTableCellContext,
    PolymorphicProps<'td'> {}
export interface DatePickerTableCellProps extends HTMLProps<'td'>, DatePickerTableCellBaseProps {}

export const DatePickerTableCell = (props: DatePickerTableCellProps) => {
  const [cellProps, localProps] = createSplitProps<UseDatePickerTableCellContext>()(props, [
    'disabled',
    'value',
    'visibleRange',
    'columns',
  ])
  const api = useDatePickerContext()
  const viewProps = useDatePickerViewContext()
  const tableCellProps = createMemo(() => {
    const viewMap = {
      day: api().getDayTableCellProps,
      month: api().getMonthTableCellProps,
      year: api().getYearTableCellProps,
    }

    const viewFn = viewMap[viewProps.view]

    // @ts-expect-error
    return viewFn(cellProps)
  })

  const mergedProps = mergeProps(tableCellProps, localProps)

  return (
    <DatePickerTableCellProvider value={cellProps}>
      <ark.td {...mergedProps} />
    </DatePickerTableCellProvider>
  )
}
