import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export type HoverCardPositionerBaseProps = {}
export interface HoverCardPositionerProps
  extends HTMLArkProps<'div'>,
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
