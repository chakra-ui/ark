import type { JSX } from 'solid-js'
import { PresenceProvider, splitPresenceProps, usePresence, type UsePresenceProps } from '../presence'
import type { UseDrawerReturn } from './use-drawer'
import { DrawerProvider } from './use-drawer-context'
import { RenderStrategyProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import { mergeProps } from '@zag-js/solid'

interface RootProviderProps {
  value: UseDrawerReturn
}

export interface DrawerRootProviderBaseProps extends RootProviderProps, UsePresenceProps {}
export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {
  children?: JSX.Element
}

export const DrawerRootProvider = (props: DrawerRootProviderProps) => {
  const [presenceProps, drawerProps] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps(() => ({ present: drawerProps.value().open }), presenceProps))

  return (
    <DrawerProvider value={drawerProps.value}>
      <RenderStrategyProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{drawerProps.children}</PresenceProvider>
      </RenderStrategyProvider>
    </DrawerProvider>
  )
}
