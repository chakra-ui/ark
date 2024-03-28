import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { usePresenceContext } from '../presence'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardPositionerProps extends HTMLArkProps<'div'> {}

export const HoverCardPositioner = defineComponent<HoverCardPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()
    const presenceApi = usePresenceContext()

    return () => (
      <>
        {presenceApi.value.isUnmounted ? null : (
          <ark.div {...api.value.positionerProps} {...attrs}>
            {slots.default?.()}
          </ark.div>
        )}
      </>
    )
  },
  {
    name: 'HoverCardPositioner',
  },
)
