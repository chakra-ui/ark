import type { ReactNode } from 'react'
import { type UseTimerContext, useTimerContext } from './use-timer-context'

export interface TimerContextProps {
  children: (context: UseTimerContext) => ReactNode
}

export const TimerContext = (props: TimerContextProps) => props.children(useTimerContext())
