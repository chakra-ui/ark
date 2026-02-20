import type { DrawerStack } from '@zag-js/drawer'
import { getContext, hasContext, setContext } from 'svelte'

const DRAWER_STACK_STORE_KEY = Symbol('DrawerStackStore')

export const provideDrawerStackStore = (stack: DrawerStack) => setContext(DRAWER_STACK_STORE_KEY, stack)
export const useDrawerStackStore = (): DrawerStack | undefined =>
  hasContext(DRAWER_STACK_STORE_KEY) ? getContext(DRAWER_STACK_STORE_KEY) : undefined
