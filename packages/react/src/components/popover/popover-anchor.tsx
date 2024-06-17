import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePopoverContext } from './use-popover-context'

export interface PopoverAnchorBaseProps extends PolymorphicProps {}
export interface PopoverAnchorProps
  extends HTMLAttributes<HTMLDivElement>,
    PopoverAnchorBaseProps {}

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>((props, ref) => {
  const popover = usePopoverContext()
  const mergedProps = mergeProps(popover.getAnchorProps(), props)

  return <ark.div {...mergedProps} ref={ref} />
})

PopoverAnchor.displayName = 'PopoverAnchor'
