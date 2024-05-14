import { createContext } from '../../utils/create-context'
import type { UseProgressReturn } from './use-progress'

export interface UseProgressContext extends UseProgressReturn {}

export const [ProgressProvider, useProgressContext] = createContext<UseProgressContext>({
  name: 'ProgressContext',
  hookName: 'useProgressContext',
  providerName: '<ProgressProvider />',
})
