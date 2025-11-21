import { createContext } from '../../utils/create-context'
import type { UseNavigationMenuReturn } from './use-navigation-menu'

export interface UseNavigationMenuContext extends UseNavigationMenuReturn {}

export const [NavigationMenuProvider, useNavigationMenuContext] =
  createContext<UseNavigationMenuContext>('NavigationMenuContext')
