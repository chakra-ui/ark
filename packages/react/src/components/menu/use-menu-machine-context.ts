import { createContext } from '../../utils/create-context'
import type { UseMenuReturn } from './use-menu'

export type UseMenuMachineContext = UseMenuReturn['service'] | undefined

export const [MenuMachineProvider, useMenuMachineContext] = createContext<UseMenuMachineContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
