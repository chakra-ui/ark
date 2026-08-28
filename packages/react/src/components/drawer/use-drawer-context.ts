'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseDrawerReturn } from './use-drawer.ts'

export interface UseDrawerContext extends UseDrawerReturn {}

export const [DrawerProvider, useDrawerContext] = createContext<UseDrawerContext>({
  name: 'DrawerContext',
  hookName: 'useDrawerContext',
  providerName: '<DrawerProvider />',
})
