import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLAtlasProps<'div'>

export const TooltipPositioner = forwardRef<'div', TooltipPositionerProps>((props, ref) => {
  const { positionerProps, isOpen } = useTooltipContext()
  const mergedProps = mergeProps(positionerProps, props)

  return isOpen ? <atlas.div {...mergedProps} ref={ref} /> : null
})
