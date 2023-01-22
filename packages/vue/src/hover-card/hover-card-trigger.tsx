import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useHoverCardContext } from './hover-card-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type HoverCardTriggerProps = Record<string, unknown>

export const HoverCardTrigger = defineComponent<HoverCardTriggerProps>({
  name: 'HoverCardTrigger',
  setup(_, { slots, attrs }) {
    const api = useHoverCardContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'HoverCardTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
