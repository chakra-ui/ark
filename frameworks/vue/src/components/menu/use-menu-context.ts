import { createContext } from '../../utils'
import type { UseMenuReturn } from './use-menu'

export type UseMenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<UseMenuContext>('MenuContext')
