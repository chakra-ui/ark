import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import type { UsePresenceProps } from '../presence/index.tsx'
import { PresenceProvider, splitPresenceProps, usePresence } from '../presence/index.tsx'
import type { UseFloatingPanelReturn } from './use-floating-panel.ts'
import { FloatingPanelProvider } from './use-floating-panel-context.ts'

interface RootProviderProps {
  value: UseFloatingPanelReturn
}

export interface FloatingPanelRootProviderBaseProps extends RootProviderProps, Omit<UsePresenceProps, 'present'> {}
export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {
  children?: JSX.Element
}

export const FloatingPanelRootProvider = (props: FloatingPanelRootProviderProps) => {
  const [presenceProps, baseProps] = splitPresenceProps(props)

  const [rootProps, localProps] = createSplitProps<RootProviderProps>()(baseProps, ['value'])
  const presence = usePresence(mergeProps(() => ({ present: rootProps.value().open }), presenceProps))

  return (
    <FloatingPanelProvider value={rootProps.value}>
      <PresenceProvider value={presence}>{localProps.children}</PresenceProvider>
    </FloatingPanelProvider>
  )
}
