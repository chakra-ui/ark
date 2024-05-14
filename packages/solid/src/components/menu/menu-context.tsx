import type { JSX } from 'solid-js'
import { type UseMenuContext, useMenuContext } from './use-menu-context'

export interface MenuContextProps {
  children: (context: UseMenuContext) => JSX.Element
}

export const MenuContext = (props: MenuContextProps) => props.children(useMenuContext())
