import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipPositionerProps = HTMLAtlasProps<'div'>

export const TooltipPositioner = forwardRef<'div', TooltipPositionerProps>((props, ref) => {
  const { positionerProps, isOpen } = useTooltipContext()
  return isOpen ? <atlas.div ref={ref} {...positionerProps} {...props} /> : null
})
