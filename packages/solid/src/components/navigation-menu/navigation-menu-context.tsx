import type { JSX } from 'solid-js'
import { type UseNavigationMenuContext, useNavigationMenuContext } from './use-navigation-menu-context'

export interface NavigationMenuContextProps {
  children: (context: UseNavigationMenuContext) => JSX.Element
}

export const NavigationMenuContext = (props: NavigationMenuContextProps) => props.children(useNavigationMenuContext())
