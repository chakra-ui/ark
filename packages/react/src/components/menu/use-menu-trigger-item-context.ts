'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseMenuReturn } from './use-menu.ts'

export type UseMenuTriggerItemContext = () => ReturnType<UseMenuReturn['api']['getTriggerItemProps']> | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<UseMenuTriggerItemContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
