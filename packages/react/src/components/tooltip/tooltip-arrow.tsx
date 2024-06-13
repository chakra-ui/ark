import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export type TooltipArrowBaseProps = {}
export interface TooltipArrowProps extends HTMLArkProps<'div'>, TooltipArrowBaseProps {}

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.getArrowProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrow.displayName = 'TooltipArrow'
