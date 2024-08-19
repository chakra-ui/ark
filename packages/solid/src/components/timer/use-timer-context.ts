import { createContext } from '../../utils/create-context'
import type { UseTimerReturn } from './use-timer'

export interface UseTimerContext extends UseTimerReturn {}

export const [TimerProvider, useTimerContext] = createContext<UseTimerContext>({
  hookName: 'useTimerContext',
  providerName: '<TimerProvider />',
})
