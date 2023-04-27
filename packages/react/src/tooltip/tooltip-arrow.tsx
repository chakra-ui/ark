import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowProps = HTMLArkProps<'div'>

export const TooltipArrow = forwardRef<'div', TooltipArrowProps>((props, ref) => {
  const { arrowProps } = useTooltipContext()
  const mergedProps = mergeProps(arrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
