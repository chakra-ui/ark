import { createContext } from '../../utils/index.ts'
import type { UseDrawerReturn } from './use-drawer.ts'

export interface UseDrawerContext extends UseDrawerReturn {}
export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerContext>('DrawerContext')
