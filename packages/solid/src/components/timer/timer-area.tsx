import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTimerContext } from './use-timer-context'

export interface TimerAreaBaseProps extends PolymorphicProps<'div'> {}
export interface TimerAreaProps extends HTMLProps<'div'>, TimerAreaBaseProps {}

export const TimerArea = (props: TimerAreaProps) => {
  const timer = useTimerContext()
  const mergedProps = mergeProps(() => timer().getAreaProps(), props)

  return <ark.div {...mergedProps} />
}
