import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './use-tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>((props, ref) => {
  const context = useTooltipContext()
  const mergedProps = mergeProps(context.arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrow.displayName = 'TooltipArrow'
