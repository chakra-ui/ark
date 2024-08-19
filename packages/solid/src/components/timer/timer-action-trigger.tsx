import { mergeProps } from '@zag-js/solid'
import type { ActionTriggerProps } from '@zag-js/timer'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerActionTriggerBaseProps
  extends ActionTriggerProps,
    PolymorphicProps<'button'> {}
export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

export const TimerActionTrigger = (props: TimerActionTriggerProps) => {
  const timer = useTimerContext()
  const mergedProps = mergeProps(() => timer().getActionTriggerProps(props), props)

  return <ark.button {...mergedProps} />
}
