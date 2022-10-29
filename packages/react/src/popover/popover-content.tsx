import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverContentProps = HTMLAtlasProps<'div'>

export const PopoverContent = forwardRef<'div', PopoverContentProps>((props, ref) => {
  const { contentProps } = usePopoverContext()
  return <atlas.div ref={ref} {...contentProps} {...props} />
})
