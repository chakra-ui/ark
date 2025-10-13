import type { JSX } from 'solid-js'
import { type UseTimerContext, useTimerContext } from './use-timer-context'

export interface TimerContextProps {
  children: (context: UseTimerContext) => JSX.Element
}

export const TimerContext = (props: TimerContextProps) => props.children(useTimerContext())
