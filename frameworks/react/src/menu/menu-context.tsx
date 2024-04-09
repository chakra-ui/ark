import type { ReactNode } from 'react'
import { useMenuContext, type UseMenuContext } from './use-menu-context'

export interface MenuContextProps {
  children: (context: UseMenuContext) => ReactNode
}

export const MenuContext = (props: MenuContextProps) => props.children(useMenuContext())
