import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useHoverCardContext } from './hover-card-context'

export const HoverCardTrigger = defineComponent({
  name: 'HoverCardTrigger',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'HoverCardTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
