import type { ReactNode } from 'react'
import { useHoverCardContext, type UseHoverCardContext } from './use-hover-card-context'

export interface HoverCardContextProps {
  children: (context: UseHoverCardContext) => ReactNode
}

export const HoverCardContext = (props: HoverCardContextProps) =>
  props.children(useHoverCardContext())
