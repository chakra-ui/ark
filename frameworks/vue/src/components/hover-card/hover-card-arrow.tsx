import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardArrowProps extends HTMLArkProps<'div'> {}

export const HoverCardArrow = defineComponent<HoverCardArrowProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()

    return () => (
      <ark.div {...api.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'HoverCardArrow',
  },
)
