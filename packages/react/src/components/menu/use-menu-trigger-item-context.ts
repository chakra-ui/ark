import { createContext } from '../../utils/create-context'
import type { UseMenuReturn } from './use-menu'

export type UseMenuTriggerItemContext = () => ReturnType<UseMenuReturn['api']['getTriggerItemProps']> | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<UseMenuTriggerItemContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
