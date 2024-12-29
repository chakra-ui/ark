import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import {
  PresenceProvider,
  type UsePresenceProps,
  splitPresenceProps,
  usePresence,
} from '../presence'
import type { UseTourReturn } from './use-tour'
import { TourProvider } from './use-tour-context'

interface RootProps {
  value: UseTourReturn
}

export interface TourRootBaseProps extends RootProps, UsePresenceProps {}
export interface TourRootProps extends TourRootBaseProps {
  children?: JSX.Element
}

export const TourRoot = (props: TourRootProps) => {
  const [presenceProps, tourProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)

  const presence = usePresence(
    mergeProps(presenceProps, () => ({ present: tourProps.value().open })),
  )

  return (
    <TourProvider value={tourProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{tourProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </TourProvider>
  )
}
