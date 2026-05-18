'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseProgressReturn } from './use-progress.ts'

export interface UseProgressContext extends UseProgressReturn {}

export const [ProgressProvider, useProgressContext] = createContext<UseProgressContext>({
  name: 'ProgressContext',
  hookName: 'useProgressContext',
  providerName: '<ProgressProvider />',
})
