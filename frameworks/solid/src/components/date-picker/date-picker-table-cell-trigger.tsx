import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellContext } from './use-date-picker-table-cell-context'
import { useDatePickerViewContext } from './use-date-picker-view-context'

export interface DatePickerTableCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTableCellTrigger = (props: DatePickerTableCellTriggerProps) => {
  const api = useDatePickerContext()
  const cellProps = useDatePickerTableCellContext()
  const viewProps = useDatePickerViewContext()

  const triggerProps = {
    day: api().getDayTableCellTriggerProps,
    month: api().getMonthTableCellTriggerProps,
    year: api().getYearTableCellTriggerProps,
    // @ts-expect-error value is number filter
  }[viewProps.view](cellProps)

  const mergedProps = mergeProps(() => triggerProps, props)

  return <ark.button {...mergedProps} />
}
