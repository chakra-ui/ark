import type { JSX } from 'solid-js'
import { type UseMenuItemContext, useMenuItemContext } from './use-menu-item-context'

export interface MenuItemContextProps {
  children: (context: UseMenuItemContext) => JSX.Element
}

export const MenuItemContext = (props: MenuItemContextProps) => props.children(useMenuItemContext())
