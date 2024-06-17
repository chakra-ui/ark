import { mergeProps } from '@zag-js/react'
import { type HTMLAttributes, forwardRef } from 'react'
import { type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardPositionerBaseProps extends PolymorphicProps {}
export interface HoverCardPositionerProps
  extends HTMLAttributes<HTMLDivElement>,
    HoverCardPositionerBaseProps {}

export const HoverCardPositioner = forwardRef<HTMLDivElement, HoverCardPositionerProps>(
  (props, ref) => {
    const hoverCard = useHoverCardContext()
    const mergedProps = mergeProps(hoverCard.getPositionerProps(), props)
    const presence = usePresenceContext()

    if (presence.unmounted) {
      return null
    }

    return <ark.div {...mergedProps} ref={ref} />
  },
)

HoverCardPositioner.displayName = 'HoverCardPositioner'
