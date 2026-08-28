'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseNavigationMenuReturn } from './use-navigation-menu.ts'

export interface UseNavigationMenuContext extends UseNavigationMenuReturn {}

export const [NavigationMenuProvider, useNavigationMenuContext] = createContext<UseNavigationMenuContext>({
  name: 'NavigationMenuContext',
  hookName: 'useNavigationMenuContext',
  providerName: '<NavigationMenuProvider />',
})
