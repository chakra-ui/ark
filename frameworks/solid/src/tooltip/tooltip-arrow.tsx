import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow = (props: TooltipArrowProps) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(() => tooltip().arrowProps, props)

  return <ark.div {...mergedProps()} />
}
