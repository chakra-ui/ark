import { createContext } from '$lib/utils/create-context'
import type { UseNavigationMenuReturn } from './use-navigation-menu.svelte.ts'

export interface UseNavigationMenuContext extends UseNavigationMenuReturn {}
export const [NavigationMenuProvider, useNavigationMenuContext] = createContext<UseNavigationMenuContext>({
  name: 'NavigationMenuContext',
})
