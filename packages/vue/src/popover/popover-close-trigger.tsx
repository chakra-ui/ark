import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { usePopoverContext } from './popover-context'

export const PopoverCloseTrigger = defineComponent({
  name: 'PopoverCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = usePopoverContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'PopoverCloseTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
