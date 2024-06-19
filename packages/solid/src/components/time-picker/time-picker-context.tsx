import type { JSX } from 'solid-js'
import { type UseTimePickerContext, useTimePickerContext } from './use-time-picker-context'

export interface TimePickerContextProps {
  children: (context: UseTimePickerContext) => JSX.Element
}

export const TimePickerContext = (props: TimePickerContextProps) =>
  props.children(useTimePickerContext())
