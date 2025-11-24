import type { LinkProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { composeRefs } from '../../utils/compose-refs'
import { createSplitProps } from '../../utils/create-split-props'
import { useRenderStrategyPropsContext } from '../../utils/render-strategy'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuContentBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps {
  value?: LinkProps['value']
}
export interface NavigationMenuContentProps extends Assign<HTMLProps<'div'>, NavigationMenuContentBaseProps> {}

const splitLinkProps = createSplitProps<LinkProps>()

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const itemContext = useNavigationMenuItemPropsContext()
  const value = props.value ?? itemContext?.value

  const [contentProps, localProps] = splitLinkProps({ ...props, value }, ['current', 'onSelect', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const renderStrategyProps = useRenderStrategyPropsContext()
  const presence = usePresence({ ...renderStrategyProps, present: navigationMenu.value === value })
  const mergedProps = mergeProps(navigationMenu.getContentProps(contentProps), presence.getPresenceProps(), localProps)

  return (
    <PresenceProvider value={presence}>
      {presence.unmounted ? null : <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />}
    </PresenceProvider>
  )
})

NavigationMenuContent.displayName = 'NavigationMenuContent'
