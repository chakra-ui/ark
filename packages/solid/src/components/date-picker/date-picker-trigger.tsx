import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    DatePickerTriggerBaseProps {}

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
