import type { JSX } from 'solid-js'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context'

export interface CollapsibleContextProps {
  children: (context: UseCollapsibleContext) => JSX.Element
}

export const CollapsibleContext = (props: CollapsibleContextProps) =>
  props.children(useCollapsibleContext())
