import { mergeProps } from '@zag-js/react'
import type { ItemProps } from '@zag-js/navigation-menu'
import { forwardRef, useId } from 'react'
import type { Assign } from '../../types'
import { createSplitProps } from '../../utils/create-split-props'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context'

export interface NavigationMenuItemBaseProps extends Omit<ItemProps, 'value'>, PolymorphicProps {
  value?: string
}
export interface NavigationMenuItemProps extends Assign<HTMLProps<'div'>, NavigationMenuItemBaseProps> {}

export const NavigationMenuItem = forwardRef<HTMLDivElement, NavigationMenuItemProps>((props, ref) => {
  const id = useId()
  const [_itemProps, localProps] = createSplitProps<Partial<ItemProps>>()(props, ['disabled', 'value'])
  const itemProps = { value: id, ..._itemProps }
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getItemProps(itemProps), localProps)

  return (
    <NavigationMenuItemPropsProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref} />
    </NavigationMenuItemPropsProvider>
  )
})

NavigationMenuItem.displayName = 'NavigationMenuItem'
