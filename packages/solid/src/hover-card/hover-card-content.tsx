import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { splitPresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'
import { HoverCardPresence, type HoverCardPresenceProps } from './hover-card-presence'

export type HoverCardContentProps = HTMLArkProps<'div'> & HoverCardPresenceProps

export const HoverCardContent = (props: HoverCardContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useHoverCardContext()
  const contentProps = mergeProps(() => api().contentProps, localProps)

  return (
    <HoverCardPresence {...presenceProps}>
      <ark.div {...contentProps} />
    </HoverCardPresence>
  )
}
