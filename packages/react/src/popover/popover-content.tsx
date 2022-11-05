import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLAtlasProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>((props, ref) => {
  const { contentProps } = usePopoverContext()
  const mergedProps = mergeProps(contentProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
