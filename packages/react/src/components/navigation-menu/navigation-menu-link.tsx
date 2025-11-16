import { mergeProps } from '@zag-js/react'
import type { LinkProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuLinkBaseProps extends Omit<LinkProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>((props, ref) => {
  const itemPropsContext = useNavigationMenuItemPropsContext()
  const [_linkProps, localProps] = createSplitProps<Partial<LinkProps>>()(props, ['current', 'onSelect', 'value'])
  const linkProps = { value: itemPropsContext?.value, ..._linkProps }
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getLinkProps(linkProps), localProps)

  return <ark.a {...mergedProps} ref={ref} />
})

NavigationMenuLink.displayName = 'NavigationMenuLink'
