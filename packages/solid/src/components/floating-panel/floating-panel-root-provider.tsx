import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
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
  children?: JSX.Element
}

export const FloatingPanelRootProvider = (props: FloatingPanelRootProviderProps) => {
  const [presenceProps, baseProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)

  const [rootProps, localProps] = createSplitProps<RootProviderProps>()(baseProps, ['value'])
  const presence = usePresence(mergeProps(() => ({ present: rootProps.value().open }), presenceProps))

  return (
    <FloatingPanelProvider value={rootProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </FloatingPanelProvider>
  )
}
