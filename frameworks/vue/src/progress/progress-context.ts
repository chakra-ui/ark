import { createContext } from '../context'
import type { UseProgressReturn } from './use-progress'

export interface ProgressContext extends UseProgressReturn {}

export const [ProgressProvider, useProgressContext] =
  createContext<ProgressContext>('ProgressContext')
