import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipInnerArrowProps = HTMLArkProps<'div'>

export const TooltipInnerArrow = (props: TooltipInnerArrowProps) => {
  const tooltip = useTooltipContext()

  return <ark.div {...tooltip().innerArrowProps} {...props} />
}
