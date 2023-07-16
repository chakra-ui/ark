import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useHoverCardContext } from './hover-card-context'

export type HoverCardTriggerProps = HTMLArkProps<'button'>

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
