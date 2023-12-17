import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useHoverCardContext } from './hover-card-context'

export interface HoverCardTriggerProps extends HTMLArkProps<'button'> {}

export const HoverCardTrigger = defineComponent({
  name: 'HoverCardTrigger',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()

    return () => (
      <ark.button {...api.value.triggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
