import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { type UseFloatingPanelProps, useFloatingPanel } from './use-floating-panel'
import { FloatingPanelProvider } from './use-floating-panel-context'

export interface FloatingPanelRootBaseProps extends UseFloatingPanelProps, UsePresenceProps {}
export interface FloatingPanelRootProps extends FloatingPanelRootBaseProps {
  children?: ReactNode
}

export const FloatingPanelRoot = (props: FloatingPanelRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const floatingPanel = useFloatingPanel(localProps)
  const presence = usePresence(mergeProps({ present: floatingPanel.open }, presenceProps))

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </FloatingPanelProvider>
  )
}
