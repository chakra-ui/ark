import { forwardRef } from '@polymorphic-factory/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLAtlasProps<'div'>

export const PopoverPositioner = forwardRef<'div', PopoverPositionerProps>((props, ref) => {
  const { positionerProps } = usePopoverContext()
  return <atlas.div ref={ref} {...positionerProps} {...props} />
})
