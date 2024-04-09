import type { ReactNode } from 'react'
import { useCollapsibleContext, type UseCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContextProps {
  children: (context: UseCollapsibleContext) => ReactNode
}

export const CollapsibleContext = (props: CollapsibleContextProps) =>
  props.children(useCollapsibleContext())
