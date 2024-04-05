import type { JSX } from 'solid-js'
import { useMenuContext, type UseMenuContext } from './use-menu-context'

export interface MenuContextProps {
  children: (context: UseMenuContext) => JSX.Element
}

export const MenuContext = (props: MenuContextProps) => props.children(useMenuContext())
