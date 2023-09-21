import { mergeProps } from '@zag-js/react'
import { forwardRef } from 'react'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'children'>> {}

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useHoverCardContext()

  return (
    <Presence present={api.isOpen} {...presenceProps}>
      <HoverCardInnerContent ref={ref} {...localProps} />
    </Presence>
  )
})

HoverCardContent.displayName = 'HoverCardContent'

const HoverCardInnerContent = forwardRef<HTMLDivElement, HoverCardContentProps>(
  function HoverCardInnerContent(props, ref) {
    const api = useHoverCardContext()
    const mergedProps = mergeProps(api.contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)
