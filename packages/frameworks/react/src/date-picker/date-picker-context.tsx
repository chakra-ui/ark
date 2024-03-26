import type { ReactNode } from 'react'
import { useDatePickerContext, type UseDatePickerContext } from './use-date-picker-context'

export interface DatePickerContextProps {
  children: (context: UseDatePickerContext) => ReactNode
}

export const DatePickerContext = (props: DatePickerContextProps) =>
  props.children(useDatePickerContext())
