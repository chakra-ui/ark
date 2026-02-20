import { createContext } from '../../utils'
import type { UseDrawerReturn } from './use-drawer'

export interface UseDrawerContext extends UseDrawerReturn {}
export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerContext>('DrawerContext')
