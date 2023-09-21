import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePopoverContext } from './popover-context'

export interface PopoverAnchorProps extends HTMLArkProps<'div'> {}

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>((props, ref) => {
  const api = usePopoverContext()
  const mergedProps = mergeProps(api.anchorProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverAnchor.displayName = 'PopoverAnchor'
