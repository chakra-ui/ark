import { mergeProps } from '@zag-js/react'
import { ark, type HTMLArkProps } from '../factory'
import { forwardRef } from '../forward-ref'
import { splitPresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'
import { HoverCardPresence, type HoverCardPresenceProps } from './hover-card-presence'

export type HoverCardContentProps = HTMLArkProps<'div'> & Omit<HoverCardPresenceProps, 'children'>

export const HoverCardContent = forwardRef<'div', HoverCardContentProps>((props, ref) => {
  const [presenceProps, hoverCardContentProps] = splitPresenceProps(props)
  return (
    <HoverCardPresence {...presenceProps}>
      <InnerHoverCardContent ref={ref} {...hoverCardContentProps} />
    </HoverCardPresence>
  )
})

const InnerHoverCardContent = forwardRef<'div', HTMLArkProps<'div'>>((props, ref) => {
  const { contentProps } = useHoverCardContext()
  const mergedProps = mergeProps(contentProps, props)

  return <ark.div {...mergedProps} ref={ref} />
})
