import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverContentBaseProps extends PolymorphicProps {}
export interface PopoverContentProps extends HTMLProps<'div'>, PopoverContentBaseProps {}

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const popover = usePopoverContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(popover.getContentProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
})

PopoverContent.displayName = 'PopoverContent'
