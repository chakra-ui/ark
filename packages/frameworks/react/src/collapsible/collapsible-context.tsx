import { useCollapsibleContext, type UseCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContextProps {
  children: (context: UseCollapsibleContext) => React.ReactNode
}

export const CollapsibleContext = (props: CollapsibleContextProps) =>
  props.children(useCollapsibleContext())
