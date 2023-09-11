import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowProps = HtmlArkProps<'div'>

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>((props, ref) => {
  const { arrowProps } = useTooltipContext()
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrow.displayName = 'TooltipArrow'
