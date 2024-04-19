import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemContext } from './use-tags-input-item-context'

export interface TagsInputItemPreviewProps extends HTMLArkProps<'div'> {}

export const TagsInputItemPreview = defineComponent<TagsInputItemPreviewProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()

    return () => (
      <ark.div {...api.value.getItemPreviewProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TagsInputItemPreview',
  },
)
