import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useHoverCardContext } from './use-hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger = defineComponent<HoverCardTriggerProps>(
  (_, { slots, attrs }) => {
    const hoverCard = useHoverCardContext()

    return () => (
      <ark.button {...hoverCard.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'HoverCardTrigger',
  },
)
