import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipArrowTipProps extends HTMLArkProps<'div'> {}

export const TooltipArrowTip: ArkComponent<'div'> = (props) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(() => api().arrowTipProps, props)

  return <ark.div {...mergedProps} />
}
