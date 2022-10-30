import { createContext } from '../createContext'
import type { UseMenuReturn } from './use-menu'

export type MenuContext = Pick<UseMenuReturn, 'api' | 'machine'>

export const [MenuProvider, useMenuContext] = createContext<MenuContext>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
})
