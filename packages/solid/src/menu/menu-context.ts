import { createContext } from '../createContext'
import type { UseMenuReturn } from './use-menu'

export type MenuContext = unknown // type `() => ReturnType<UseMenuReturn>['api']` can't be named

export const [MenuProvider, useMenuContext] = createContext<MenuContext | undefined>({
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})

export type MenuMachineContext = unknown // type `() => ReturnType<UseMenuReturn>['machine']` can't be named

export const [MenuMachineProvider, useMenuMachineContext] = createContext<
  MenuMachineContext | undefined
>({
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})

export type MenuTriggerItemProviderContext = () =>
  | ReturnType<ReturnType<UseMenuReturn>['api']['getTriggerItemProps']>
  | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<
  MenuTriggerItemProviderContext | undefined
>({
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
