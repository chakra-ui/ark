import { createContext } from '../create-context'
import { type UseMenuReturn } from './use-menu'

export const [MenuProvider, useMenuContext] = createContext<UseMenuReturn['api'] | undefined>({
  name: 'MenuContext',
  hookName: 'useMenuContext',
  providerName: '<MenuProvider />',
  strict: false,
})

export const [MenuMachineProvider, useMenuMachineContext] = createContext<
  UseMenuReturn['machine'] | undefined
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
