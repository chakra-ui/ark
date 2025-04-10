import { createContext } from '$lib/utils/create-context'
import type { UseTimerReturn } from './use-timer.svelte'

export interface UseTimerContext extends UseTimerReturn {}

export const [TimerProvider, useTimerContext] = createContext<UseTimerContext>({
  key: 'TimerContext',
})
