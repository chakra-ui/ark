import type { JSX } from '@solidjs/web'
import { type UseProgressContext, useProgressContext } from './use-progress-context.ts'

export interface ProgressContextProps {
  children: (context: UseProgressContext) => JSX.Element
}

export const ProgressContext = (props: ProgressContextProps) => props.children(useProgressContext())
