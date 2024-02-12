import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'
import { useDatePickerTableCellContext } from './date-picker-table-cell-context'
import { useDatePickerViewContext } from './date-picker-view-context'

export interface DatePickerTableCellTriggerProps extends HTMLArkProps<'button'> {}

export const DatePickerTableCellTrigger: ArkComponent<'button'> = (
  props: DatePickerTableCellTriggerProps,
) => {
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
