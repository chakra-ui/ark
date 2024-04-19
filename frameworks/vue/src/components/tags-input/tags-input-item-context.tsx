import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import {
  type UseTagsInputItemContext,
  useTagsInputItemContext,
} from './use-tags-input-item-context'

export type TagsInputItemContextProps = SlotsType<{
  default: UnwrapRef<UseTagsInputItemContext>
}>

export const TagsInputItemContext = defineComponent(
  (_, { slots }) => {
    const tagsinputitem = useTagsInputItemContext()

    return () => slots.default(tagsinputitem.value)
  },
  {
    name: 'TagsInputItemContext',
    slots: Object as TagsInputItemContextProps,
  },
)
