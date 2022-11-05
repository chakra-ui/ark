import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipInnerArrowProps = HTMLAtlasProps<'div'>

export const TooltipInnerArrow = forwardRef<'div', TooltipInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = useTooltipContext()
  const mergedProps = mergeProps(innerArrowProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
