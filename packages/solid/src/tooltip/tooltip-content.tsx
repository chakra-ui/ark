import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLArkProps<'div'>

export const TooltipContent = (props: TooltipContentProps) => {
  const tooltip = useTooltipContext()

  return <ark.div {...tooltip().contentProps} {...props} />
}
