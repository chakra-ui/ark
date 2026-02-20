import { createContext } from '../../utils/create-context'
import type { UseDrawerReturn } from './use-drawer'

export interface UseDrawerContext extends UseDrawerReturn {}

export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerContext>({
  name: 'DrawerContext',
  hookName: 'useDrawerContext',
  providerName: '<DrawerProvider />',
})
