import type { ReactNode } from 'react'
import { useMenuItemContext, type UseMenuItemContext } from './use-menu-item-context'

export interface MenuItemContextProps {
  children: (context: UseMenuItemContext) => ReactNode
}

export const MenuItemContext = (props: MenuItemContextProps) => props.children(useMenuItemContext())
