import type { JSX } from 'solid-js'
import { type UseSplitterContext, useSplitterContext } from './use-splitter-context'

export interface SplitterContextProps {
  children: (context: UseSplitterContext) => JSX.Element
}

export const SplitterContext = (props: SplitterContextProps) => props.children(useSplitterContext())
