import type { JSX } from '@solidjs/web'
import { type UseDatePickerContext, useDatePickerContext } from './use-date-picker-context.ts'

export interface DatePickerContextProps {
  children: (context: UseDatePickerContext) => JSX.Element
}

export const DatePickerContext = (props: DatePickerContextProps) => props.children(useDatePickerContext())
