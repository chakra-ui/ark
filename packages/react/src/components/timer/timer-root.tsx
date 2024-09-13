import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { type UseTimerProps, useTimer } from './use-timer'
import { TimerProvider } from './use-timer-context'

export interface TimerRootBaseProps extends UseTimerProps, PolymorphicProps {}

export interface TimerRootProps extends HTMLProps<'div'>, TimerRootBaseProps {}

export const TimerRoot = forwardRef<HTMLDivElement, TimerRootProps>((props, ref) => {
  const [useTimerProps, localProps] = createSplitProps<UseTimerProps>()(props, [
    'id',
    'ids',
    'autoStart',
    'interval',
    'countdown',
    'startMs',
    'targetMs',
    'onComplete',
    'onTick',
  ])

  const timer = useTimer(useTimerProps)
  const mergedProps = mergeProps(timer.getRootProps(), localProps)

  return (
    <TimerProvider value={timer}>
      <ark.div {...mergedProps} ref={ref} />
    </TimerProvider>
  )
})

TimerRoot.displayName = 'TimerRoot'
