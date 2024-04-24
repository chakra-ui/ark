import type { ReactNode } from 'react'
import { type UseSplitterContext, useSplitterContext } from './use-splitter-context'

export interface SplitterContextProps {
  children: (context: UseSplitterContext) => ReactNode
}

export const SplitterContext = (props: SplitterContextProps) => props.children(useSplitterContext())
