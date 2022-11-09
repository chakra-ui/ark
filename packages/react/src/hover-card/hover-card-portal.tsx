import { Portal, PortalProps } from '@reach/portal'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPortalProps = PortalProps

export const HoverCardPortal = (props: HoverCardPortalProps) => {
  const { isOpen } = useHoverCardContext()
  return isOpen ? <Portal type="ark-portal" {...props} /> : null
}
