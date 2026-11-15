import type { JSX } from '@solidjs/web'
import { type UseMenuItemContext, useMenuItemContext } from './use-menu-item-context.ts'

export interface MenuItemContextProps {
  children: (context: UseMenuItemContext) => JSX.Element
}

export const MenuItemContext = (props: MenuItemContextProps) => props.children(useMenuItemContext())
