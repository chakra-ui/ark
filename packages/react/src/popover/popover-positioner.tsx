import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLAtlasProps<'div'>

export const PopoverPositioner = forwardRef<'div', PopoverPositionerProps>((props, ref) => {
  const { positionerProps } = usePopoverContext()
  return <atlas.div ref={ref} {...positionerProps} {...props} />
})
