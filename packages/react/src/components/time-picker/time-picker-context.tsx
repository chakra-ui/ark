import type { ReactNode } from 'react'
import { type UseTimePickerContext, useTimePickerContext } from './use-time-picker-context'

export interface TimePickerContextProps {
  children: (context: UseTimePickerContext) => ReactNode
}

export const TimePickerContext = (props: TimePickerContextProps) => props.children(useTimePickerContext())
