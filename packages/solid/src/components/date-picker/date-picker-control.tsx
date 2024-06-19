import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerControlBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerControlProps extends HTMLProps<'div'>, DatePickerControlBaseProps {}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
