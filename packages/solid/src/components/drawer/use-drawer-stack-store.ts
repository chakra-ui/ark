import type { DrawerStack } from '@zag-js/drawer'
import { createContext as createSolidContext, useContext } from 'solid-js'

const DrawerStackStoreContext = createSolidContext<DrawerStack>()

export const DrawerStackStoreProvider = DrawerStackStoreContext.Provider
export const useDrawerStackStore = () => useContext(DrawerStackStoreContext)
