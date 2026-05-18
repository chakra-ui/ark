'use client'

import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTooltipContext } from './use-tooltip-context.ts'

export interface TooltipArrowTipBaseProps extends PolymorphicProps {}
export interface TooltipArrowTipProps extends HTMLProps<'div'>, TooltipArrowTipBaseProps {}

export const TooltipArrowTip = forwardRef<HTMLDivElement, TooltipArrowTipProps>((props, ref) => {
  const tooltip = useTooltipContext()
  const mergedProps = mergeProps(tooltip.getArrowTipProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrowTip.displayName = 'TooltipArrowTip'
