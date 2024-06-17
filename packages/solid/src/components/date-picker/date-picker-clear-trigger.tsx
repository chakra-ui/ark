import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerClearTriggerProps
  extends JSX.HTMLAttributes<HTMLButtonElement>,
    DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
