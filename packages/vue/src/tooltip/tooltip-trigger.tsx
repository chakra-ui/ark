import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useTooltipContext } from './tooltip-context'

export const TooltipTrigger = defineComponent({
  name: 'TooltipTrigger',
  setup(_, { slots, attrs }) {
    const api = useTooltipContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'TooltipTrigger')

      return h(DefaultSlot, { ...api.value.triggerProps, ...attrs })
    }
  },
})
