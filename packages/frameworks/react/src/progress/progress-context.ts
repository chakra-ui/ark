import { createContext } from '../create-context'
import { type UseProgressReturn } from './use-progress'

export interface ProgressContext extends UseProgressReturn {}

export const [ProgressProvider, useProgressContext] = createContext<ProgressContext>({
  name: 'ProgressContext',
  hookName: 'useProgressContext',
  providerName: '<ProgressProvider />',
})
