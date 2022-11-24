import { createContext } from '../createContext'
import type { UseMenuReturn } from './use-menu'

export type MenuContext = unknown // type `UseMenuReturn['api']` can't be named

export const [MenuProvider, useMenuContext] = createContext<MenuContext | undefined>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})

export type MenuMachineContext = unknown // type `UseMenuReturn['machine']` can't be named

export const [MenuMachineProvider, useMenuMachineContext] = createContext<
  MenuMachineContext | undefined
>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})

export type MenuTriggerItemProviderContext = () =>
  | ReturnType<UseMenuReturn['api']['getTriggerItemProps']>
  | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<
  MenuTriggerItemProviderContext | undefined
>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
