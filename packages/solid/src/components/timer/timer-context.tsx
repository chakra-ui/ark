import type { JSX } from '@solidjs/web'
import { type UseTimerContext, useTimerContext } from './use-timer-context.ts'

export interface TimerContextProps {
  children: (context: UseTimerContext) => JSX.Element
}

export const TimerContext = (props: TimerContextProps) => props.children(useTimerContext())
