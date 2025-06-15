import type { Accessor } from '$lib/types'
import { createContext } from '$lib/utils/create-context'
import type { UseMenuReturn } from './use-menu.svelte'

export type UseMenuContext = Accessor<ReturnType<UseMenuReturn>['api']>

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})
