import { defineComponent, h } from 'vue'
import type { HTMLArkProps } from '../factory'
import { useUniqueChild } from '../utils'
import { useEditableContext } from './editable-context'

export type EditableCancelTriggerProps = HTMLArkProps<'button'>

export const EditableCancelTrigger = defineComponent({
  name: 'EditableCancelTrigger',
  setup(_, { slots, attrs }) {
    const api = useEditableContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'EditableCancelTrigger')

      return h(DefaultSlot, { ...api.value.cancelTriggerProps, ...attrs })
    }
  },
})
