import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowTipBaseProps extends PolymorphicProps<'div'> {}
export interface TooltipArrowTipProps extends HTMLProps<'div'>, TooltipArrowTipBaseProps {}

export const TooltipArrowTip = (props: TooltipArrowTipProps) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().getArrowTipProps(), props)

  return <ark.div {...mergedProps} />
}
