import { mergeProps } from '@zag-js/solid'
import type { ActionTriggerProps, ActionTriggerState } from '@zag-js/timer'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTimerContext } from './use-timer-context.ts'

export interface TimerActionTriggerState extends ActionTriggerState {}

export interface TimerActionTriggerBaseProps
  extends ActionTriggerProps, PolymorphicProps<'button', TimerActionTriggerState> {}
export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

export const TimerActionTrigger = (props: TimerActionTriggerProps) => {
  const [actionTriggerProps, localProps] = createSplitProps<ActionTriggerProps>()(props, ['action'])
  const timer = useTimerContext()
  const mergedProps = mergeProps(() => timer().getActionTriggerProps(actionTriggerProps), localProps)

  return <ark.button {...mergedProps} state={timer().getActionTriggerState(actionTriggerProps)} />
}
