import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HTMLArkProps<'div'>

export const PopoverAnchor = forwardRef<'div'>((props, ref) => {
  const { anchorProps } = usePopoverContext()
  const mergedProps = mergeProps(anchorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
