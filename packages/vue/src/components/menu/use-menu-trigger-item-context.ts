import type { ComputedRef } from 'vue'
import { createContext } from '../../utils/create-context.ts'
import type { UseMenuReturn } from './use-menu.ts'

export type UseMenuTriggerItemContext = ComputedRef<
  ReturnType<UseMenuReturn['api']['value']['getTriggerItemProps']> | undefined
>

export const [MenuTriggerItemProvider, useMenuTriggerItemContext] =
  createContext<UseMenuTriggerItemContext>('MenuTriggerItemContext')
