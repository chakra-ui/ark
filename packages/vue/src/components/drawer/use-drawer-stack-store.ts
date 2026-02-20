import type { DrawerStack } from '@zag-js/drawer'
import { inject, provide } from 'vue'

const DRAWER_STACK_STORE_KEY = Symbol('DrawerStackStore')

export const provideDrawerStackStore = (stack: DrawerStack) => provide(DRAWER_STACK_STORE_KEY, stack)
export const useDrawerStackStore = (): DrawerStack | undefined => inject(DRAWER_STACK_STORE_KEY, undefined)
