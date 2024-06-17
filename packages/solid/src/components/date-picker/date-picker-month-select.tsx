import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerMonthSelectBaseProps extends PolymorphicProps<'select'> {}
export interface DatePickerMonthSelectProps
  extends JSX.SelectHTMLAttributes<HTMLSelectElement>,
    DatePickerMonthSelectBaseProps {}

export const DatePickerMonthSelect = (props: DatePickerMonthSelectProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getMonthSelectProps(), props)

  return (
    <ark.select {...mergedProps}>
      {api()
        .getMonths()
        .map((month) => (
          <option value={month.value}>{month.label}</option>
        ))}
    </ark.select>
  )
}
