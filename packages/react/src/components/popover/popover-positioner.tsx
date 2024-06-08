import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerProps extends HTMLArkProps<'div'> {}

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  (props, ref) => {
    const popover = usePopoverContext()
    const presence = usePresenceContext()
    const mergedProps = mergeProps(popover.getPositionerProps(), props)

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

PopoverPositioner.displayName = 'PopoverPositioner'
