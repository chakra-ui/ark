import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTimerProps, useTimer } from './use-timer'
import { TimerProvider } from './use-timer-context'

export interface TimerRootBaseProps extends UseTimerProps, PolymorphicProps<'div'> {}
export interface TimerRootProps extends HTMLProps<'div'>, TimerRootBaseProps {}

export const TimerRoot = (props: TimerRootProps) => {
  const [useTimerProps, localProps] = createSplitProps<UseTimerProps>()(props, [
    'id',
    'autoStart',
    'interval',
    'countdown',
    'startMs',
    'targetMs',
    'onComplete',
    'onTick',
  ])

  const timer = useTimer(useTimerProps)
  const mergedProps = mergeProps(() => timer().getRootProps(), localProps)

  return (
    <TimerProvider value={timer}>
      <ark.div {...mergedProps} />
    </TimerProvider>
  )
}
