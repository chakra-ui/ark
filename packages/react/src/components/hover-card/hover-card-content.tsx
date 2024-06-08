import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'> {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(hoverCard.getContentProps(), presence.getPresenceProps(ref), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

HoverCardContent.displayName = 'HoverCardContent'
