'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseMenubarReturn } from './use-menubar.ts'

export interface UseMenubarContext extends UseMenubarReturn {}

export const [MenubarProvider, useMenubarContext] = createContext<UseMenubarContext>({
  name: 'MenubarContext',
  hookName: 'useMenubarContext',
  providerName: '<MenubarProvider />',
  strict: false,
})
