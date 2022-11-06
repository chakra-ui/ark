import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipInnerArrowProps = HTMLArkProps<'div'>

export const TooltipInnerArrow = forwardRef<'div', TooltipInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = useTooltipContext()
  const mergedProps = mergeProps(innerArrowProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
