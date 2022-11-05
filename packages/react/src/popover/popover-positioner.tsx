import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverPositionerProps = HTMLAtlasProps<'div'>

export const PopoverPositioner = forwardRef<'div', PopoverPositionerProps>((props, ref) => {
  const { positionerProps } = usePopoverContext()
  const mergedProps = mergeProps(positionerProps, props)

  return <atlas.div {...mergedProps} ref={ref} />
})
