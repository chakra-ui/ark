'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseScrollAreaReturn } from './use-scroll-area.ts'

export interface UseScrollAreaContext extends UseScrollAreaReturn {}

export const [ScrollAreaProvider, useScrollAreaContext] = createContext<UseScrollAreaContext>({
  name: 'ScrollAreaContext',
  hookName: 'useScrollAreaContext',
  providerName: '<ScrollAreaProvider />',
})
