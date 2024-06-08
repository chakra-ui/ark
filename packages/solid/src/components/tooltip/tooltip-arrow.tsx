import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow = (props: TooltipArrowProps) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(() => tooltip().getArrowProps(), props)

  return <ark.div {...mergedProps} />
}
