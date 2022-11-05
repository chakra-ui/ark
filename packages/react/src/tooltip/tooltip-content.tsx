import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLAtlasProps<'div'>

export const TooltipContent = forwardRef<'div', TooltipContentProps>((props, ref) => {
  const { contentProps } = useTooltipContext()
  const mergedProps = mergeProps(contentProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
