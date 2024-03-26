import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'> {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const context = useHoverCardContext()
  const presenceApi = usePresenceContext()
  const mergedProps = mergeProps(context.contentProps, presenceApi.getPresenceProps(ref), props)

  if (presenceApi.isUnmounted) {
    return null
  }

  return <ark.div {...mergedProps} />
})

HoverCardContent.displayName = 'HoverCardContent'
