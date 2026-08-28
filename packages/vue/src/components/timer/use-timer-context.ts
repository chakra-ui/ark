import { createContext } from '../../utils/create-context.ts'
import type { UseTimerReturn } from './use-timer.ts'

export interface UseTimerContext extends UseTimerReturn {}

export const [TimerProvider, useTimerContext] = createContext<UseTimerContext>('TimerContext')
