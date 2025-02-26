import { mergeProps } from '@zag-js/solid'
import type { ActionTriggerProps } from '@zag-js/timer'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerActionTriggerBaseProps extends ActionTriggerProps, PolymorphicProps<'button'> {}
export interface TimerActionTriggerProps extends HTMLProps<'button'>, TimerActionTriggerBaseProps {}

export const TimerActionTrigger = (props: TimerActionTriggerProps) => {
  const [actionTriggerProps, localProps] = createSplitProps<ActionTriggerProps>()(props, ['action'])
  const timer = useTimerContext()
  const mergedProps = mergeProps(() => timer().getActionTriggerProps(actionTriggerProps), localProps)

  return <ark.button {...mergedProps} />
}
