import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTimerReturn } from './use-timer'
import { TimerProvider } from './use-timer-context'

interface RootProviderProps {
  value: UseTimerReturn
}

export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps {}
export interface TimerRootProviderProps extends HTMLProps<'div'>, TimerRootProviderBaseProps {}

export const TimerRootProvider = forwardRef<HTMLDivElement, TimerRootProviderProps>(
  (props, ref) => {
    const [{ value: timer }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
    const mergedProps = mergeProps(timer.getRootProps(), localProps)

    return (
      <TimerProvider value={timer}>
        <ark.div {...mergedProps} ref={ref} />
      </TimerProvider>
    )
  },
)

TimerRootProvider.displayName = 'TimerRootProvider'
