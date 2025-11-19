import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuItemProps extends Assign<HTMLProps<'div'>, NavigationMenuItemBaseProps> {}

export const NavigationMenuItem = forwardRef<HTMLDivElement, NavigationMenuItemProps>((props, ref) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['disabled', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getItemProps(itemProps), localProps)

  return <ark.div {...mergedProps} ref={ref} />
})

NavigationMenuItem.displayName = 'NavigationMenuItem'
