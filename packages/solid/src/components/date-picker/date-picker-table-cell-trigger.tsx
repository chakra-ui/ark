import { mergeProps } from '@zag-js/solid'
import { type JSX, createMemo } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellContext } from './use-date-picker-table-cell-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerTableCellTriggerProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    DatePickerTableCellTriggerBaseProps {}

export const DatePickerTableCellTrigger = (props: DatePickerTableCellTriggerProps) => {
  const api = useDatePickerContext()
  const cellProps = useDatePickerTableCellContext()
  const viewProps = useDatePickerViewContext()

  const triggerProps = createMemo(() => {
    const viewMap = {
      day: api().getDayTableCellTriggerProps,
      month: api().getMonthTableCellTriggerProps,
      year: api().getYearTableCellTriggerProps,
    }

    const viewFn = viewMap[viewProps.view]

    // @ts-expect-error
    return viewFn(cellProps)
  })

  const mergedProps = mergeProps(triggerProps, props)

  return <ark.div {...mergedProps} />
}
