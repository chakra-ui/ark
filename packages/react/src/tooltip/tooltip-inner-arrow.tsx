import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipInnerArrowProps = HTMLAtlasProps<'div'>

export const TooltipInnerArrow = forwardRef<'div', TooltipInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = useTooltipContext()
  return <atlas.div ref={ref} {...innerArrowProps} {...props} />
})
