'use client'

import { mergeProps } from '@zag-js/react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowTipBaseProps extends PolymorphicProps {}
export interface TooltipArrowTipProps extends HTMLProps<'div'>, TooltipArrowTipBaseProps {}

export const TooltipArrowTip = ({ ref, ...props }: TooltipArrowTipProps) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
}

TooltipArrowTip.displayName = 'TooltipArrowTip'
