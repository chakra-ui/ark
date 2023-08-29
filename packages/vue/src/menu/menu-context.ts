import { createContext } from '../context'
import { type UseMenuReturn } from './use-menu'

export type MenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<MenuContext>('MenuContext')

export type MenuMachineContext = UseMenuReturn['menuMachine']

export const [MenuMachineProvider, useMenuMachineContext] =
  createContext<MenuMachineContext>('MenuMachineContext')

export type MenuTriggerItemProviderContext = () =>
  | ReturnType<UseMenuReturn['api']['value']['getTriggerItemProps']>
  | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] =
  createContext<MenuTriggerItemProviderContext>('MenuTriggerItemContext')
