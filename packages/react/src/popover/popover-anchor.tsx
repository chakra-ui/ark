import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HtmlArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export type PopoverAnchorProps = HtmlArkProps<'div'>

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>((props, ref) => {
  const { anchorProps } = usePopoverContext()
  const mergedProps = mergeProps(anchorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverAnchor.displayName = 'PopoverAnchor'
