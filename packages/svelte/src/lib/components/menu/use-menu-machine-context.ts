import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { Service } from '@zag-js/menu'

export type UseMenuMachineContext = Accessor<Service | undefined>

export const [MenuMachineProvider, useMenuMachineContext] = createContext<UseMenuMachineContext>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
