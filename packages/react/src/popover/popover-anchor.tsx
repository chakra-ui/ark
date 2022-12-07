import { forwardRef } from '@polymorphic-factory/react'
import { mergeProps } from '@zag-js/react'
import { ark, HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HTMLArkProps<'div'>

export const PopoverAnchor = forwardRef<'div', PopoverAnchorProps>((props, ref) => {
  const { anchorProps } = usePopoverContext()
  const mergedProps = mergeProps(anchorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
