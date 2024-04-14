import type { JSX } from 'solid-js'
import { type UseHoverCardContext, useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContextProps {
  children: (context: UseHoverCardContext) => JSX.Element
}

export const HoverCardContext = (props: HoverCardContextProps) =>
  props.children(useHoverCardContext())
