import type { ControlState } from '@zag-js/date-input'
import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useDateInputContext } from './use-date-input-context.ts'

export interface DateInputControlState extends ControlState {}

export interface DateInputControlBaseProps extends PolymorphicProps<'div', DateInputControlState> {}
export interface DateInputControlProps extends HTMLProps<'div'>, DateInputControlBaseProps {}

export const DateInputControl = (props: DateInputControlProps) => {
  const api = useDateInputContext()
  const mergedProps = mergeProps(() => api().getControlProps(), props)
  return <ark.div {...mergedProps} state={api().getControlState()} />
}
