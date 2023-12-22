import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = defineComponent({
  name: 'TagsInputClearTrigger',
  setup(_, { attrs, slots }) {
    const api = useTagsInputContext()

    return () => (
      <ark.button {...api.value.clearTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
})
