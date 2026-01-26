import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context'

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

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />}
    </PresenceProvider>
  )
})

NavigationMenuViewport.displayName = 'NavigationMenuViewport'
