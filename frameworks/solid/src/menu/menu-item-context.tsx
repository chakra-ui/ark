import type { JSX } from 'solid-js'
import { useMenuItemContext, type UseMenuItemContext } from './use-menu-item-context'

export interface MenuItemContextProps {
  children: (context: UseMenuItemContext) => JSX.Element
}

export const MenuItemContext = (props: MenuItemContextProps) => props.children(useMenuItemContext())
