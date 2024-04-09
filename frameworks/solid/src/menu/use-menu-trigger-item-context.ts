import { type Api } from '@zag-js/menu'
import type { Accessor } from 'solid-js'
import { createContext } from '../create-context'

export type UseMenuTriggerItemContext = Accessor<ReturnType<Api['getTriggerItemProps']> | undefined>

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] =
  createContext<UseMenuTriggerItemContext>({
    hookName: 'useMenuMachineContext',
    providerName: '<MenuMachineProvider />',
    strict: false,
  })
