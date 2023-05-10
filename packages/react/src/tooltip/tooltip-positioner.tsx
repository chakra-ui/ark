import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = forwardRef<'div', TooltipPositionerProps>((props, ref) => {
  const { positionerProps, isOpen } = useTooltipContext()
  const mergedProps = mergeProps(positionerProps, props)

  return isOpen ? <ark.div {...mergedProps} ref={ref} /> : null
})
