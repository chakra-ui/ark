import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardArrowProps extends HTMLArkProps<'div'> {}

export const HoverCardArrow = defineComponent<HoverCardArrowProps>(
  (_, { slots, attrs }) => {
    const hoverCard = useHoverCardContext()

    return () => (
      <ark.div {...hoverCard.value.arrowProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'HoverCardArrow',
  },
)
