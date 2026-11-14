import type { JSX } from '@solidjs/web'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context.ts'

export interface CollapsibleContextProps {
  children: (context: UseCollapsibleContext) => JSX.Element
}

export const CollapsibleContext = (props: CollapsibleContextProps) => props.children(useCollapsibleContext())
