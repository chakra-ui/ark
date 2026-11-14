import type { JSX } from '@solidjs/web'
import { type UseHoverCardContext, useHoverCardContext } from './use-hover-card-context.ts'

export interface HoverCardContextProps {
  children: (context: UseHoverCardContext) => JSX.Element
}

export const HoverCardContext = (props: HoverCardContextProps) => props.children(useHoverCardContext())
