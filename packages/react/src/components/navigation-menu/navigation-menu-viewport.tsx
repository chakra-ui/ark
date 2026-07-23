'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { useComposedRefs } from '../../utils/compose-refs.ts'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { PresenceGate } from '../presence/presence-gate.tsx'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context.ts'

export interface NavigationMenuViewportBaseProps extends PolymorphicProps {}
export interface NavigationMenuViewportProps extends HTMLProps<'div'>, NavigationMenuViewportBaseProps {}

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>((props, ref) => {
  const viewportPropsContext = useNavigationMenuViewportPropsContext()
  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()

  const presence = usePresence({
    ...renderStrategyProps,
    present: navigationMenu.open,
  })

  const mergedProps = mergeProps(
    navigationMenu.getViewportProps(viewportPropsContext),
    presence.getPresenceProps(),
    props,
  )
  const composedRefs = useComposedRefs(presence.ref, ref)

  return (
    <PresenceProvider value={presence}>
      <PresenceGate presence={presence}>
        <ark.div {...mergedProps} ref={composedRefs} />
      </PresenceGate>
    </PresenceProvider>
  )
})

NavigationMenuViewport.displayName = 'NavigationMenuViewport'
