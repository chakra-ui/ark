import { createContext } from '~/utils/create-context'
import type { UseMenuReturn } from './use-menu'

export type UseMenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>({
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})
