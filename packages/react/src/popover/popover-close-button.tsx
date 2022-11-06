import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverCloseButtonProps = HTMLArkProps<'button'>

export const PopoverCloseButton = forwardRef<'button', PopoverCloseButtonProps>((props, ref) => {
  const { closeButtonProps } = usePopoverContext()
  const mergedProps = mergeProps(closeButtonProps, props)

  return <ark.button {...mergedProps} ref={ref} />
})
