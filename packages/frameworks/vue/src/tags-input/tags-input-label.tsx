import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputLabelProps extends HTMLArkProps<'label'> {}

export const TagsInputLabel = defineComponent({
  name: 'TagsInputLabel',
  setup(_, { slots, attrs }) {
    const api = useTagsInputContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {slots.default?.()}
      </ark.label>
    )
  },
})
