import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UseFloatingPanelReturn } from './use-floating-panel'
import { FloatingPanelProvider } from './use-floating-panel-context'

interface RootProviderProps {
  value: UseFloatingPanelReturn
}

export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, Omit<UsePresenceProps, 'present'> {}
export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {
  children?: ReactNode
}

export const FloatingPanelRootProvider = (props: FloatingPanelRootProviderProps) => {
  const [presenceProps, baseProps] = splitPresenceProps(props)

  const [{ value: floatingPanel }, localProps] = createSplitProps<RootProviderProps>()(baseProps, ['value'])
  const presence = usePresence(mergeProps({ present: floatingPanel.open }, presenceProps))

  return (
    <FloatingPanelProvider value={floatingPanel}>
      <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
    </FloatingPanelProvider>
  )
}
