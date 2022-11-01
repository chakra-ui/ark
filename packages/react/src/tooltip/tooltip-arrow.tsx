import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipArrowProps = HTMLAtlasProps<'div'>

export const TooltipArrow = forwardRef<'div', TooltipArrowProps>((props, ref) => {
  const { arrowProps } = useTooltipContext()
  return <atlas.div ref={ref} {...arrowProps} {...props} />
})
