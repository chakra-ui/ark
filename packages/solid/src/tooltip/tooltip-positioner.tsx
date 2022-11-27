import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = (props: TooltipPositionerProps) => {
  const tooltip = useTooltipContext()

  return tooltip().isOpen ? <ark.div {...tooltip().positionerProps} {...props} /> : null
}
