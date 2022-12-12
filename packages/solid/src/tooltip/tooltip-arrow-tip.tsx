import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowTipProps = HTMLArkProps<'div'>

export const TooltipArrowTip = (props: TooltipArrowTipProps) => {
  const tooltip = useTooltipContext()

  return <ark.div {...tooltip().arrowTipProps} {...props} />
}
