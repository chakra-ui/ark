import { mergeProps } from '@zag-js/react'
import type { LinkProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuContentBaseProps extends LinkProps, PolymorphicProps {}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const [contentProps, localProps] = createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: navigationMenu.value === props.value })
  const mergedProps = mergeProps(navigationMenu.getContentProps(contentProps), presence.getPresenceProps(), localProps)

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />}
    </PresenceProvider>
  )
})

NavigationMenuContent.displayName = 'NavigationMenuContent'
