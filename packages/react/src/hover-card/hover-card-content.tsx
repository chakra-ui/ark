import { mergeProps } from '@zag-js/react'
import { forwardRef, type ComponentPropsWithoutRef } from 'react'
import { ark } from '../factory'
import { splitPresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'
import { HoverCardPresence, type HoverCardPresenceProps } from './hover-card-presence'

export type HoverCardContentProps = ComponentPropsWithoutRef<typeof ark.div> &
  Omit<HoverCardPresenceProps, 'children'>

export const HoverCardContent = forwardRef<HTMLDivElement, HoverCardContentProps>((props, ref) => {
  const [presenceProps, hoverCardContentProps] = splitPresenceProps(props)
  return (
    <HoverCardPresence {...presenceProps}>
      <InnerHoverCardContent ref={ref} {...hoverCardContentProps} />
    </HoverCardPresence>
  )
})

HoverCardContent.displayName = 'HoverCardContent'

const InnerHoverCardContent = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<typeof ark.div>>(
  (props, ref) => {
    const { contentProps } = useHoverCardContext()
    const mergedProps = mergeProps(contentProps, props)

    return <ark.div {...mergedProps} ref={ref} />
  },
)

InnerHoverCardContent.displayName = 'InnerHoverCardContent'
