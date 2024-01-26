import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow: ArkComponent<'div'> = (props: TooltipArrowProps) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(() => tooltip().arrowProps, props)

  return <ark.div {...mergedProps} />
}
