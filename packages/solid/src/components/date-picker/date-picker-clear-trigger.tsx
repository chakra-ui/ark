import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps<'button'> {}
export interface DatePickerClearTriggerProps
  extends HTMLProps<'button'>,
    DatePickerClearTriggerBaseProps {}

export const DatePickerClearTrigger = (props: DatePickerClearTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getClearTriggerProps(), props)

  return <ark.button {...mergedProps} />
}
