import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowProps = HTMLArkProps<'div'>

export const TooltipArrow = (props: TooltipArrowProps) => {
  const tooltip = useTooltipContext()

  return <ark.div {...tooltip().arrowProps} {...props} />
}
