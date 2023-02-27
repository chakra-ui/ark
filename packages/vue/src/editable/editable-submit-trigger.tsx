import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useEditableContext } from './editable-context'

export const EditableSubmitTrigger = defineComponent({
  name: 'EditableSubmitTrigger',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'EditableSubmitTrigger')

      return h(DefaultSlot, { ...api.value.submitTriggerProps, ...attrs })
    }
  },
})
