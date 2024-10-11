import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerMonthSelectProps
  extends HTMLProps<'select'>,
    DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = (props: DatePickerMonthSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getMonthSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      <Index each={datePicker().getMonths()}>
        {(month) => <option value={month().value}>{month().label}</option>}
      </Index>
    </ark.select>
  )
}
