import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLAtlasProps<'div'>

export const PopoverArrow = forwardRef<'div', PopoverArrowProps>((props, ref) => {
  const { arrowProps } = usePopoverContext()
  const mergedProps = mergeProps(arrowProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
