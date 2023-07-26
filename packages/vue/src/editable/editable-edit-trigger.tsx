import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useEditableContext } from './editable-context'

export type EditableEditTriggerProps = HTMLArkProps<'button'>

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
