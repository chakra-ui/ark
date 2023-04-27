import { defineComponent, h, type PropType } from 'vue'
import { useUniqueChild, type ComponentWithProps } from '../utils'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export const TagDeleteTrigger: ComponentWithProps<TagProps> = defineComponent({
  name: 'TagDeleteTrigger',
  props: {
    index: {
      type: [String, Number] as PropType<TagProps['index']>,
      required: true,
    },
    value: {
      type: String as PropType<TagProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<TagProps['disabled']>,
    },
  },
  setup(props, { slots, attrs }) {
    const api = useTagsInputContext()
    return () => {
      const DefaultSlot = useUniqueChild(slots, 'TagDeleteTrigger')

      return h(DefaultSlot, { ...api.value.getTagDeleteTriggerProps(props), ...attrs })
    }
  },
})
