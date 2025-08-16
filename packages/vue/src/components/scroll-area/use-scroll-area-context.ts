import { createContext } from '../../utils'
import type { UseScrollAreaReturn } from './use-scroll-area'

export interface UseScrollAreaContext extends UseScrollAreaReturn {}

export const [ScrollAreaProvider, useScrollAreaContext] = createContext<UseScrollAreaContext>('ScrollAreaContext')
