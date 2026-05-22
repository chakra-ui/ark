'use client'

import { mergeProps } from '@zag-js/react'
import { composeRefs } from '../../utils/compose-refs'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentBaseProps extends PolymorphicProps {}
export interface HoverCardContentProps extends HTMLProps<'div'>, HoverCardContentBaseProps {}

export const HoverCardContent = ({ ref, ...props }: HoverCardContentProps) => {
  const hoverCard = useHoverCardContext()
  const presence = usePresenceContext()
  const mergedProps = mergeProps(hoverCard.getContentProps(), presence.getPresenceProps(), props)

  if (presence.unmounted) {
    return null
  }

  return <ark.div {...mergedProps} ref={composeRefs(presence.ref, ref)} />
}

HoverCardContent.displayName = 'HoverCardContent'
