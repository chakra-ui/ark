import { createContext } from '../../utils/create-context'
import type { UseMenuReturn } from './use-menu'

export type UseMenuMachineContext = UseMenuReturn['machine'] | undefined

export const [MenuMachineProvider, useMenuMachineContext] = createContext<UseMenuMachineContext>({
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
