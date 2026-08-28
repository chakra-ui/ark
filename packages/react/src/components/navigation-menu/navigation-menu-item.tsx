'use client'

import type { ItemProps } from '@zag-js/navigation-menu'
import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { NavigationMenuItemPropsProvider } from './use-navigation-menu-item-props-context.ts'

export interface NavigationMenuItemBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuItemProps extends HTMLProps<'div'>, NavigationMenuItemBaseProps {}

const splitItemProps = createSplitProps<ItemProps>()

export const NavigationMenuItem = forwardRef<HTMLDivElement, NavigationMenuItemProps>((props, ref) => {
  const [itemProps, localProps] = splitItemProps(props, ['disabled', 'value'])
  const navigationMenu = useNavigationMenuContext()
  const mergedProps = mergeProps(navigationMenu.getItemProps(itemProps), localProps)

  return (
    <NavigationMenuItemPropsProvider value={itemProps}>
      <ark.div {...mergedProps} ref={ref} />
    </NavigationMenuItemPropsProvider>
  )
})

NavigationMenuItem.displayName = 'NavigationMenuItem'
