import type { ComputedRef } from 'vue'
import { createContext } from '../../utils'
import type { UseMenuReturn } from './use-menu'

export type MenuContext = UseMenuReturn['api']

export const [MenuProvider, useMenuContext] = createContext<MenuContext>('MenuContext')

export type MenuMachineContext = UseMenuReturn['machine']

export const [MenuMachineProvider, useMenuMachineContext] =
  createContext<MenuMachineContext>('MenuMachineContext')

export type MenuTriggerItemProviderContext = ComputedRef<
  ReturnType<UseMenuReturn['api']['value']['getTriggerItemProps']> | undefined
>

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] =
  createContext<MenuTriggerItemProviderContext>('MenuTriggerItemContext')
