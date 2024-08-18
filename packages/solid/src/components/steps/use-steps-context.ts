import { createContext } from '../../utils/create-context'
import type { UseStepsReturn } from './use-steps'

export interface UseStepsContext extends UseStepsReturn {}

export const [StepsProvider, useStepsContext] = createContext<UseStepsContext>({
  hookName: 'useStepsContext',
  providerName: '<StepsProvider />',
})
