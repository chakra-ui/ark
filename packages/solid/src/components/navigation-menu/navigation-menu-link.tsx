import { mergeProps } from '@zag-js/solid'
import type { LinkProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import type { Assign } from '../../types'

export interface NavigationMenuLinkBaseProps extends LinkProps, PolymorphicProps<'a'> {}
export interface NavigationMenuLinkProps extends Assign<HTMLProps<'a'>, NavigationMenuLinkBaseProps> {}

export const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const [linkProps, localProps] = createSplitProps<LinkProps>()(props, ['current', 'onSelect', 'value'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getLinkProps(linkProps), localProps)

  return <ark.a {...mergedProps} />
}
