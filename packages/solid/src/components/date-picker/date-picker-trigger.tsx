import type { TriggerState } from '@zag-js/date-picker'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerTriggerState extends TriggerState {}

export interface DatePickerTriggerBaseProps extends PolymorphicProps<'button', DatePickerTriggerState> {}
export interface DatePickerTriggerProps extends HTMLProps<'button'>, DatePickerTriggerBaseProps {}

export const DatePickerTrigger = (props: DatePickerTriggerProps) => {
  const api = useDatePickerContext()
  const mergedProps = mergeProps(() => api().getTriggerProps(), props)

  return <ark.button {...mergedProps} state={api().getTriggerState()} />
}
