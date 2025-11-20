import { mergeProps } from '@zag-js/solid'
import type { ItemProps } from '@zag-js/navigation-menu'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps<'div'> {}
export interface NavigationMenuItemProps extends HTMLProps<'div'>, NavigationMenuItemBaseProps {}

export const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'value'])
  const api = useNavigationMenuContext()
  const mergedProps = mergeProps(() => api().getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} />
}
