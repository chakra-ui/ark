import type { ReactNode } from 'react'
import { type UseMenuContext, useMenuContext } from './use-menu-context'

export interface MenuContextProps {
  children: (context: UseMenuContext) => ReactNode
}

export const MenuContext = (props: MenuContextProps) => props.children(useMenuContext())
