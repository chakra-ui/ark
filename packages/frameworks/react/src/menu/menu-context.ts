import { createContext } from '../create-context'
import { type UseMenuReturn } from './use-menu'

type MenuContext = unknown // type `UseMenuReturn['api']` can't be named

export const [MenuProvider, useMenuContext] = createContext<MenuContext | undefined>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})

type MenuMachineContext = unknown // type `UseMenuReturn['machine']` can't be named

export const [MenuMachineProvider, useMenuMachineContext] = createContext<
  MenuMachineContext | undefined
>({
  name: 'MenuMachineContext',
  hookName: 'useMenuMachineContext',
  providerName: '<MenuMachineProvider />',
  strict: false,
})

type MenuTriggerItemProviderContext = () =>
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
