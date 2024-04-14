import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputLabelProps extends HTMLArkProps<'label'> {}

export const TagsInputLabel = defineComponent<TagsInputLabelProps>(
  (_, { slots, attrs }) => {
    const api = useTagsInputContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
  {
    name: 'TagsInputLabel',
  },
)
