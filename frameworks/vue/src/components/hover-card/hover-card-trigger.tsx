import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger = defineComponent<HoverCardTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useHoverCardContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'HoverCardTrigger',
  },
)
