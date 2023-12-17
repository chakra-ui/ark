import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputControlProps extends HTMLArkProps<'div'> {}

export const TagsInputControl = defineComponent({
  name: 'TagsInputControl',
  setup(_, { slots, attrs }) {
    const api = useTagsInputContext()

    return () => (
      <ark.div {...api.value.controlProps} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
})
