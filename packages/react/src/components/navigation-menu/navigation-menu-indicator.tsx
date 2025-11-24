import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuIndicatorBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorProps extends HTMLProps<'div'>, NavigationMenuIndicatorBaseProps {}

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>((props, ref) => {
  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: navigationMenu.open })
  const mergedProps = mergeProps(navigationMenu.getIndicatorProps(), presence.getPresenceProps(), props)

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />}
    </PresenceProvider>
  )
})

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator'
