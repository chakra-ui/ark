import type { ReactNode } from 'react'
import { type UseMenuItemContext, useMenuItemContext } from './use-menu-item-context'

export interface MenuItemContextProps {
  children: (context: UseMenuItemContext) => ReactNode
}

export const MenuItemContext = (props: MenuItemContextProps) => props.children(useMenuItemContext())
