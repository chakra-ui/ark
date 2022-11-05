import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { atlas, HTMLAtlasProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverCloseButtonProps = HTMLAtlasProps<'button'>

export const PopoverCloseButton = forwardRef<'button', PopoverCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = usePopoverContext()
  const mergedProps = mergeProps(closeButtonProps, props)

  return <atlas.button {...mergedProps} ref={ref} />
})
