import type { ReactNode } from 'react'
import { type UseProgressContext, useProgressContext } from './use-progress-context'

export interface ProgressContextProps {
  children: (context: UseProgressContext) => ReactNode
}

export const ProgressContext = (props: ProgressContextProps) => props.children(useProgressContext())
