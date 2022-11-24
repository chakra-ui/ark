import { Portal, PortalProps } from '@zag-js/react'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardPortalProps = PortalProps

export const HoverCardPortal = (props: HoverCardPortalProps) => {
  const { isOpen } = useHoverCardContext()
  return isOpen ? <Portal {...props} /> : null
}
