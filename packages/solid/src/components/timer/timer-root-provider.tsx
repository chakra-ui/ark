import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import type { UseTimerReturn } from './use-timer'
import { TimerProvider } from './use-timer-context'

interface RootProviderProps {
  value: UseTimerReturn
}

export interface TimerRootProviderBaseProps extends RootProviderProps, PolymorphicProps<'div'> {}
export interface TimerRootProviderProps extends HTMLProps<'div'>, TimerRootProviderBaseProps {}

export const TimerRootProvider = (props: TimerRootProviderProps) => {
  const [{ value: timer }, localProps] = createSplitProps<RootProviderProps>()(props, ['value'])
  const mergedProps = mergeProps(() => timer().getRootProps(), localProps)

  return (
    <TimerProvider value={timer}>
      <ark.div {...mergedProps} />
    </TimerProvider>
  )
}
