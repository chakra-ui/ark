import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowTipProps extends HTMLArkProps<'div'> {}

export const TooltipArrowTip = forwardRef<HTMLDivElement, TooltipArrowTipProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrowTip.displayName = 'TooltipArrowTip'
