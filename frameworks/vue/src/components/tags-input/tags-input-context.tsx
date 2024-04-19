import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseTagsInputContext, useTagsInputContext } from './use-tags-input-context'

export type TagsInputContextProps = SlotsType<{
  default: UnwrapRef<UseTagsInputContext>
}>

export const TagsInputContext = defineComponent(
  (_, { slots }) => {
    const tagsinput = useTagsInputContext()

    return () => slots.default(tagsinput.value)
  },
  {
    name: 'TagsInputContext',
    slots: Object as TagsInputContextProps,
  },
)
