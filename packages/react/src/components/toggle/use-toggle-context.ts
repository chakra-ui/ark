'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseToggleReturn } from './use-toggle.ts'

export interface UseToggleContext extends UseToggleReturn {}

export const [ToggleProvider, useToggleContext] = createContext<UseToggleContext>({
  name: 'ToggleContext',
  hookName: 'useToggleContext',
  providerName: '<ToggleProvider />',
})
