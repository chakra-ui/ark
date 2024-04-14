import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemDeleteTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputItemDeleteTrigger = defineComponent<TagsInputItemDeleteTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()

    return () => (
      <ark.button {...api.value.getItemDeleteTriggerProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TagsInputItemDeleteTrigger',
  },
)
