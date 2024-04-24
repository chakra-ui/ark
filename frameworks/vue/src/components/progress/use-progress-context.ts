import { createContext } from '../../utils'
import type { UseProgressReturn } from './use-progress'

export interface UseProgressContext extends UseProgressReturn {}

export const [ProgressProvider, useProgressContext] =
  createContext<UseProgressContext>('ProgressContext')
