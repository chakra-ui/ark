import type { LinkProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'

export interface NavigationMenuLinkBaseProps extends Partial<LinkProps>, PolymorphicProps {}
export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}

const splitLinkProps = createSplitProps<LinkProps>()

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>((props, ref) => {
  const itemContext = useNavigationMenuItemPropsContext()
  const value = props.value ?? itemContext?.value

  const [linkProps, localProps] = splitLinkProps({ ...props, value }, ['current', 'onSelect', 'value', 'closeOnClick'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getLinkProps(linkProps), localProps)

  return <ark.a {...mergedProps} ref={ref} />
})

NavigationMenuLink.displayName = 'NavigationMenuLink'
