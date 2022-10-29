import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { useTooltipContext } from './tooltip-context'

export type TooltipContentProps = HTMLAtlasProps<'div'>

export const TooltipContent = forwardRef<'div', TooltipContentProps>((props, ref) => {
  const { contentProps } = useTooltipContext()
  return <atlas.div ref={ref} {...contentProps} {...props} />
})
