import { useHoverCardContext, type UseHoverCardContext } from './use-hover-card-context'

export interface HoverCardContextProps {
  children: (context: UseHoverCardContext) => React.ReactNode
}

export const HoverCardContext = (props: HoverCardContextProps) =>
  props.children(useHoverCardContext())
