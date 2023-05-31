import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useToastItemContext } from './toast-item-context'

export const ToastCloseTrigger = defineComponent({
  name: 'ToastCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useToastItemContext()

    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
