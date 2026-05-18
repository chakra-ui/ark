import { createContext } from '../../utils/create-context.ts'
import type { UseMenuReturn } from './use-menu.ts'

export type UseMenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>({
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})
