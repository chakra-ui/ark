import { createContext } from '../../utils'
import type { UseMenuReturn } from './use-menu'

export type UseMenuMachineContext = UseMenuReturn['machine'] | undefined

export const [MenuMachineProvider, useMenuMachineContext] =
  createContext<UseMenuMachineContext>('MenuMachineContext')
