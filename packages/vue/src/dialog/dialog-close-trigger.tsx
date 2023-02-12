import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useDialogContext } from './dialog-context'

export const DialogCloseTrigger = defineComponent({
  name: 'DialogCloseTrigger',
  setup(_, { slots, attrs }) {
    const api = useDialogContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'DialogCloseTrigger')

      return h(DefaultSlot, { ...api.value.closeTriggerProps, ...attrs })
    }
  },
})
