import { mergeProps } from '@zag-js/solid'
import { For } from 'solid-js'
import { ark, type HTMLArkProps } from '../factory'
import { useDatePickerContext } from './date-picker-context'

export type DatePickerMonthSelectProps = HTMLArkProps<'select'>

export const DatePickerMonthSelect = (props: DatePickerMonthSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().monthSelectProps, props)

  return (
    <ark.select {...mergedProps}>
      <For each={datePicker().getMonths()}>
        {(month) => <option value={month.value}>{month.label}</option>}
      </For>
    </ark.select>
  )
}
