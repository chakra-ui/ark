import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellContext } from './use-date-picker-table-cell-props-context'
import { useDatePickerViewContext } from './use-date-picker-view-props-context'

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerTableCellTriggerProps
  extends HTMLProps<'div'>,
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
