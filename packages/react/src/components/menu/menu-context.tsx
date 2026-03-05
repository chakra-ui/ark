import type { ReactNode } from 'react'
import { useMenuContext } from './use-menu-context'

export interface MenuContextProps {
  children: (context: ReturnType<typeof useMenuContext>) => ReactNode
}

export const MenuContext = (props: MenuContextProps) => props.children(useMenuContext())
