import { createContext } from '../../utils'
import type { UseTimerReturn } from './use-timer'

export interface UseTimerContext extends UseTimerReturn {}

export const [TimerProvider, useTimerContext] = createContext<UseTimerContext>('TimerContext')
