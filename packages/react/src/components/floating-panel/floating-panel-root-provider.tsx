import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UseFloatingPanelReturn } from './use-floating-panel'
import { FloatingPanelProvider } from './use-floating-panel-context'

interface RootProviderProps {
  value: UseFloatingPanelReturn
}

export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {
  children?: ReactNode
}

export const FloatingPanelRootProvider = (props: FloatingPanelRootProviderProps) => {
  const [presenceProps, { value: floatingPanel, children }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps({ present: floatingPanel.open }, presenceProps))

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </FloatingPanelProvider>
  )
}
