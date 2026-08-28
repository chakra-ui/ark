'use client'

import { createContext } from '../../utils/create-context.ts'
import type { UseStepsReturn } from './use-steps.ts'

export interface UseStepsContext extends UseStepsReturn {}

export const [StepsProvider, useStepsContext] = createContext<UseStepsContext>({
  name: 'StepsContext',
  hookName: 'useStepsContext',
  providerName: '<StepsProvider />',
})
