import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverDescriptionProps = HTMLAtlasProps<'div'>

export const PopoverDescription = forwardRef<'div', PopoverDescriptionProps>((props, ref) => {
  const { descriptionProps } = usePopoverContext()
  return <atlas.div ref={ref} {...descriptionProps} {...props} />
})
