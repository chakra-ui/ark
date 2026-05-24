'use client'

import { mergeProps } from '@zag-js/react'
import type { ReactNode } from 'react'
import { RenderStrategyPropsProvider, splitRenderStrategyProps } from '../../utils/render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UsePresenceProps } from '../presence/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { splitPresenceProps } from '../presence/split-presence-props.ts'
import type { UseDrawerReturn } from './use-drawer.ts'
import { DrawerProvider } from './use-drawer-context.ts'
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
