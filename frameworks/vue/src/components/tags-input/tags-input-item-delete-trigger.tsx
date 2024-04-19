import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputItemDeleteTrigger = defineComponent<TagsInputItemDeleteTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()

    return () => (
      <ark.button {...api.value.getItemDeleteTriggerProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TagsInputItemDeleteTrigger',
  },
)
