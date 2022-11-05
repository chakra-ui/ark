import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverInnerArrowProps = HTMLAtlasProps<'div'>

export const PopoverInnerArrow = forwardRef<'div', PopoverInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = usePopoverContext()
  const mergedProps = mergeProps(innerArrowProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
