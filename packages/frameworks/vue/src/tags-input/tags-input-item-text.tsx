import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'
import { useTagsInputItemContext } from './tags-input-item-context'

export interface TagsInputItemTextProps extends HTMLArkProps<'span'> {}

export const TagsInputItemText = defineComponent({
  name: 'TagsInputItemText',
  setup(_, { slots, attrs }) {
    const api = useTagsInputContext()
    const itemProps = useTagsInputItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps.value)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
})
