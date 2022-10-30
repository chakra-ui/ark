import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverArrowProps = HTMLAtlasProps<'div'>

export const PopoverArrow = forwardRef<'div', PopoverArrowProps>((props, ref) => {
  const { arrowProps } = usePopoverContext()
  return <atlas.div ref={ref} {...arrowProps} {...props} />
})
