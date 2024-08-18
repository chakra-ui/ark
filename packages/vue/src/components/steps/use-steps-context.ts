import { createContext } from '../../utils'
import type { UseStepsReturn } from './use-steps'

export interface UseStepsContext extends UseStepsReturn {}

export const [StepsProvider, useStepsContext] = createContext<UseStepsContext>('StepsContext')
