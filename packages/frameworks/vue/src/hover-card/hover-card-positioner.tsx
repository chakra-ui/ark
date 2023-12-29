import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardPositionerProps extends HTMLArkProps<'div'> {}

export const HoverCardPositioner = defineComponent<HoverCardPositionerProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.positionerProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'HoverCardPositioner',
  },
)
