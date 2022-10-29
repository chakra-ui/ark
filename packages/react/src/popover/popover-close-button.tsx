import { forwardRef } from 'react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverCloseButtonProps = HTMLAtlasProps<'button'>

export const PopoverCloseButton = forwardRef<'button', PopoverCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = usePopoverContext()
  return <atlas.button ref={ref} {...closeButtonProps} {...props} />
})
