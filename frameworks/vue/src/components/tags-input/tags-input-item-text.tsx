import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = defineComponent<TagsInputItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'TagsInputItemText',
  },
)
