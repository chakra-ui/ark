import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useTooltipContext } from './tooltip-context'

/** This type is here so that the script 'check-exports' passes
 *  because in Vue we don't pass 'children' as props
 */
export type TooltipTriggerProps = Record<string, unknown>

export const TooltipTrigger = defineComponent<TooltipTriggerProps>({
  name: 'TooltipTrigger',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'TooltipTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
