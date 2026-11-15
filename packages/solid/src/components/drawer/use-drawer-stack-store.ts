import type { DrawerStack } from '@zag-js/drawer'
import { createContext as createSolidContext, useContext } from 'solid-js'

const DrawerStackStoreContext = createSolidContext<DrawerStack | null>(null)

export const DrawerStackStoreProvider = DrawerStackStoreContext
export const useDrawerStackStore = () => useContext(DrawerStackStoreContext) ?? undefined
