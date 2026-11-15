import type { JSX } from '@solidjs/web'
import { type UseDateInputContext, useDateInputContext } from './use-date-input-context.ts'

export interface DateInputContextProps {
  children: (context: UseDateInputContext) => JSX.Element
}

export const DateInputContext = (props: DateInputContextProps) => props.children(useDateInputContext())
