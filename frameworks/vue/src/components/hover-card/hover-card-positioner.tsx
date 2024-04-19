import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardPositionerProps extends HTMLArkProps<'div'> {}

export const HoverCardPositioner = defineComponent<HoverCardPositionerProps>(
  (_, { slots, attrs }) => {
    const hoverCard = useHoverCardContext()
    const presenceApi = usePresenceContext()

    return () =>
      presenceApi.value.isUnmounted ? null : (
        <ark.div {...hoverCard.value.positionerProps} {...attrs}>
          {slots.default?.()}
        </ark.div>
      )
  },
  {
    name: 'HoverCardPositioner',
  },
)
