import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export interface TooltipArrowTipProps extends HTMLArkProps<'div'> {}

export const TooltipArrowTip = forwardRef<HTMLDivElement, TooltipArrowTipProps>((props, ref) => {
  const api = useTooltipContext()
  const mergedProps = mergeProps(api.arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

TooltipArrowTip.displayName = 'TooltipArrowTip'
