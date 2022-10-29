import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverInnerArrowProps = HTMLAtlasProps<'div'>

export const PopoverInnerArrow = forwardRef<'div', PopoverInnerArrowProps>((props, ref) => {
  const { innerArrowProps } = usePopoverContext()
  return <atlas.div ref={ref} {...innerArrowProps} {...props} />
})
