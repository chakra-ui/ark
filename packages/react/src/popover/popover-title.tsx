import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverTitleProps = HTMLAtlasProps<'div'>

export const PopoverTitle = forwardRef<'div', PopoverTitleProps>((props, ref) => {
  const { titleProps } = usePopoverContext()
  return <atlas.div ref={ref} {...titleProps} {...props} />
})
