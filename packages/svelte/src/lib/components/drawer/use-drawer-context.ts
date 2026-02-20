import { createContext } from '$lib/utils/create-context'
import type { UseDrawerReturn } from './use-drawer.svelte'

export interface UseDrawerContext extends UseDrawerReturn {}
export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerContext>({
  name: 'DrawerContext',
})
