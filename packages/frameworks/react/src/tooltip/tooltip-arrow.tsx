import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipArrowProps extends HTMLArkProps<'div'> {}

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>((props, ref) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(api.arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrow.displayName = 'TooltipArrow'
