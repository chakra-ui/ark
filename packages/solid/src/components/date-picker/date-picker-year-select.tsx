import { mergeProps } from '@zag-js/solid'
import { Index } from 'solid-js'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerYearSelectProps
  extends HTMLProps<'select'>,
    DatePickerYearSelectBaseProps {}

export const DatePickerYearSelect = (props: DatePickerYearSelectProps) => {
  const datePicker = useDatePickerContext()
  const mergedProps = mergeProps(() => datePicker().getYearSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      <Index each={datePicker().getYears()}>
        {(year) => <option value={year().value}>{year().label}</option>}
      </Index>
    </ark.select>
  )
}
