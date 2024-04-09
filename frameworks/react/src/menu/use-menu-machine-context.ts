import { createContext } from '../create-context'
import type { UseMenuReturn } from './use-menu'

export type UseMenuMachineContext = UseMenuReturn['machine'] | undefined

export const [MenuMachineProvider, useMenuMachineContext] = createContext<UseMenuMachineContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
