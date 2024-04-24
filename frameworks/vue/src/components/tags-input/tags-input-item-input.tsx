import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { useTagsInputItemPropsContext } from './use-tags-input-item-props-context'

export interface TagsInputItemInputProps extends HTMLArkProps<'input'> {}

export const TagsInputItemInput = defineComponent<TagsInputItemInputProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemPropsContext()

    return () => (
      <ark.input {...api.value.getItemInputProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.input>
    )
  },
  {
    name: 'TagsInputItemInput',
  },
)
