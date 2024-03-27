import { createContext } from '../create-context'
import { type UseMenuReturn } from './use-menu'

export type MenuContext = () => ReturnType<ReturnType<UseMenuReturn>['api']>

export const [MenuProvider, useMenuContext] = createContext<MenuContext>({
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})

export type MenuMachineContext = () => ReturnType<UseMenuReturn>['machine']

export const [MenuMachineProvider, useMenuMachineContext] = createContext<
  MenuMachineContext | undefined
>({
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})

export type MenuTriggerItemProviderContext = () =>
  | ReturnType<ReturnType<ReturnType<UseMenuReturn>['api']>['getTriggerItemProps']>
  | undefined

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] = createContext<
  MenuTriggerItemProviderContext | undefined
>({
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})
