import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { type PresenceProps, usePresenceContext } from '../presence'
import { emits, props } from '../presence/presence.props'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardContentProps extends HTMLArkProps<'div'>, PresenceProps {}

export const HoverCardContent = defineComponent<HoverCardContentProps>(
  (_, { slots, attrs }) => {
    const hoverCard = useHoverCardContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.unmounted ? null : (
        <ark.div {...hoverCard.value.contentProps} {...presenceApi.value.presenceProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'HoverCardContent',
    props,
    emits,
  },
)
