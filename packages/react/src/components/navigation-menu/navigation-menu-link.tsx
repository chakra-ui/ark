import { mergeProps } from '@zag-js/react'
import type { LinkProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuLinkBaseProps extends LinkProps, PolymorphicProps {}
export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>((props, ref) => {
  const [linkProps, localProps] = createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getLinkProps(linkProps), localProps)

  return <ark.a {...mergedProps} ref={ref} />
})

NavigationMenuLink.displayName = 'NavigationMenuLink'
