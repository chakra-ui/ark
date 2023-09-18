import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowTipProps = HTMLArkProps<'div'>

export const TooltipArrowTip = (props: TooltipArrowTipProps) => {
  const api = useTooltipContext()
  const arrowTipProps = mergeProps(() => api().arrowTipProps, props)
  return <ark.div {...arrowTipProps} />
}
