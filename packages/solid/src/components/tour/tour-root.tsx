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
  tour: UseTourReturn
}

export interface TourRootBaseProps extends RootProps, UsePresenceProps {}
export interface TourRootProps extends TourRootBaseProps {
  children?: JSX.Element
}

export const TourRoot = (props: TourRootProps) => {
  const [presenceProps, rootProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)

  const presence = usePresence(
    mergeProps(presenceProps, () => ({ present: rootProps.tour().open })),
  )

  return (
    <TourProvider value={rootProps.tour}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{rootProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </TourProvider>
  )
}
