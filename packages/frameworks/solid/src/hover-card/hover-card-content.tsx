import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { Presence, splitPresenceProps, type PresenceProps } from '../presence'
import type { Assign } from '../types'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardContentProps
  extends Assign<HTMLArkProps<'div'>, Omit<PresenceProps, 'fallback'>> {}

export const HoverCardContent = (props: HoverCardContentProps) => {
  const [presenceProps, localProps] = splitPresenceProps(props)
  const api = useHoverCardContext()
  const mergedProps = mergeProps(() => api().contentProps, localProps)

  return (
    <Presence present={api().isOpen} {...presenceProps} fallback={<div {...api().contentProps} />}>
      <ark.div {...mergedProps} />
    </Presence>
  )
}
