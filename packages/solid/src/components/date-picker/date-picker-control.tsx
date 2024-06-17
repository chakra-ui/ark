import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerControlBaseProps extends PolymorphicProps<'div'> {}
export interface DatePickerControlProps
  extends JSX.HTMLAttributes<HTMLDivElement>,
    DatePickerControlBaseProps {}

export const DatePickerControl = (props: DatePickerControlProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)

  return <ark.div {...mergedProps} />
}
