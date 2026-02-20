import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy'
import type { UsePresenceProps } from '../presence'
import { PresenceProvider, usePresence } from '../presence'
import { splitPresenceProps } from '../presence/split-presence-props'
import { type UseDrawerProps, useDrawer } from './use-drawer'
import { DrawerProvider } from './use-drawer-context'

export interface DrawerRootBaseProps extends UseDrawerProps, UsePresenceProps {}
export interface DrawerRootProps extends DrawerRootBaseProps {
  children?: ReactNode | undefined
}

export const DrawerRoot = (props: DrawerRootProps) => {
  const [presenceProps, { children, ...localProps }] = splitPresenceProps(props)
  const [renderStrategyProps] = splitRenderStrategyProps(presenceProps)
  const drawer = useDrawer(localProps)
  const presence = usePresence(mergeProps({ present: drawer.open }, presenceProps))

  return (
    <DrawerProvider value={drawer}>
      <RenderStrategyPropsProvider value={renderStrategyProps}>
        <PresenceProvider value={presence}>{children}</PresenceProvider>
      </RenderStrategyPropsProvider>
    </DrawerProvider>
  )
}
