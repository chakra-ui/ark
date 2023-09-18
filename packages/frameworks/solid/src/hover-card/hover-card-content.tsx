import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardContentProps = HTMLArkProps<'div'> & PresenceProps

export const HoverCardContent = (props: HoverCardContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useHoverCardContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}
