import { useSplitterContext, type UseSplitterContext } from './use-splitter-context'

export interface SplitterContextProps {
  children: (context: UseSplitterContext) => React.ReactNode
}

export const SplitterContext = (props: SplitterContextProps) => props.children(useSplitterContext())
