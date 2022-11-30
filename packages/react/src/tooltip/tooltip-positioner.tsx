import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLArkProps<'div'>

export const TooltipPositioner = forwardRef<'div', TooltipPositionerProps>((props, ref) => {
  const { positionerProps } = useTooltipContext()
  const mergedProps = mergeProps(positionerProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
