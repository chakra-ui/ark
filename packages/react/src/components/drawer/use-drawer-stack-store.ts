import type { DrawerStack } from '@zag-js/drawer'
import { createContext, useContext } from 'react'

const DrawerStackStoreContext = createContext<DrawerStack | undefined>(undefined)

export const DrawerStackStoreProvider = DrawerStackStoreContext.Provider
export const useDrawerStackStore = () => useContext(DrawerStackStoreContext)
