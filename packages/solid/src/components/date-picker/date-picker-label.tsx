import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerLabelBaseProps extends PolymorphicProps<'label'> {}
export interface DatePickerLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    DatePickerLabelBaseProps {}

export const DatePickerLabel = (props: DatePickerLabelProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
