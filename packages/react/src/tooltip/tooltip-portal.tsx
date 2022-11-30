import { Portal, PortalProps } from '@zag-js/react'
import { useTooltipContext } from './tooltip-context'

export type TooltipPortalProps = PortalProps

export const TooltipPortal = (props: TooltipPortalProps) => {
  const { isOpen } = useTooltipContext()

  return isOpen ? <Portal {...props} /> : null
}
