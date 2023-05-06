import { defineComponent, h } from 'vue'
import { useUniqueChild } from '../utils'
import { useTagsInputContext } from './tags-input-context'

export const TagsInputClearTrigger = defineComponent({
  name: 'TagsInputClearTrigger',
  setup(_, { slots, attrs }) {
    const api = useTagsInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'TagsInputClearTrigger')

      return h(DefaultSlot, { ...api.value.clearTriggerProps, ...attrs })
    }
  },
})
