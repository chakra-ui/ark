import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemInputProps extends HTMLArkProps<'input'> {}

export const TagsInputItemInput = defineComponent<TagsInputItemInputProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()

    return () => (
      <ark.input {...api.value.getItemInputProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
  {
    name: 'TagsInputItemInput',
  },
)
