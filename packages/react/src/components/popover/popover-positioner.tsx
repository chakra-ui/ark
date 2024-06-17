import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { usePopoverContext } from './use-popover-context'

export interface PopoverPositionerBaseProps extends PolymorphicProps {}
export interface PopoverPositionerProps
  extends HTMLAttributes<HTMLDivElement>,
    PopoverPositionerBaseProps {}

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
