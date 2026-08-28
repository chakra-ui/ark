'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy.ts'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import { type UseDrawerProps, useDrawer } from './use-drawer.ts'
import { DrawerProvider } from './use-drawer-context.ts'

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
