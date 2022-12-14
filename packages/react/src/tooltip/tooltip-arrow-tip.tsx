import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowTipProps = HTMLArkProps<'div'>

export const TooltipArrowTip = forwardRef<'div', TooltipArrowTipProps>((props, ref) => {
  const { arrowTipProps } = useTooltipContext()
  const mergedProps = mergeProps(arrowTipProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
