import { mergeProps } from '@zag-js/solid'
import { For } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerMonthSelectProps
  extends HTMLProps<'select'>,
    DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = (props: DatePickerMonthSelectProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getMonthSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      <For each={api().getMonths()}>
        {(month) => <option value={month.value}>{month.label}</option>}
      </For>
    </ark.select>
  )
}
