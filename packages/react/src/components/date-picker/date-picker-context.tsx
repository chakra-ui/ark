import type { ReactNode } from 'react'
import { type UseDatePickerContext, useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContextProps {
  children: (context: UseDatePickerContext) => ReactNode
}

export const DatePickerContext = (props: DatePickerContextProps) => props.children(useDatePickerContext())
