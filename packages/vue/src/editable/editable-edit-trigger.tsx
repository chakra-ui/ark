import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useEditableContext } from './editable-context'

export const EditableEditTrigger = defineComponent({
  name: 'EditableEditTrigger',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'EditableEditTrigger')

      return h(DefaultSlot, { ...api.value.editTriggerProps, ...attrs })
    }
  },
})
