import type { JSX } from 'solid-js'
import { type UseDatePickerContext, useDatePickerContext } from './use-date-picker-context'

export interface DatePickerContextProps {
  children: (context: UseDatePickerContext) => JSX.Element
}

export const DatePickerContext = (props: DatePickerContextProps) =>
  props.children(useDatePickerContext())
