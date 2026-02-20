import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import type { UseDrawerReturn } from './use-drawer'
import { DrawerProvider } from './use-drawer-context'
interface RootProviderProps {
  value: UseDrawerReturn
}

export interface DrawerRootProviderBaseProps extends RootProviderProps, UsePresenceProps, PolymorphicProps {}
export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {
  children?: ReactNode | undefined
}

export const DrawerRootProvider = (props: DrawerRootProviderProps) => {
  const [presenceProps, { value: drawer, children }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const presence = usePresence(mergeProps({ present: drawer.open }, presenceProps))

  return (
    <DrawerProvider value={drawer}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </DrawerProvider>
  )
}
