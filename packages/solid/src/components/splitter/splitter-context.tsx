import type { JSX } from '@solidjs/web'
import { type UseSplitterContext, useSplitterContext } from './use-splitter-context.ts'

export interface SplitterContextProps {
  children: (context: UseSplitterContext) => JSX.Element
}

export const SplitterContext = (props: SplitterContextProps) => props.children(useSplitterContext())
