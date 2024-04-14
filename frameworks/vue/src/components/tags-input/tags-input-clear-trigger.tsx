import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputClearTriggerProps extends HTMLArkProps<'button'> {}

export const TagsInputClearTrigger = defineComponent<TagsInputClearTriggerProps>(
  (_, { attrs, slots }) => {
    const api = useTagsInputContext()

    return () => (
      <ark.button {...api.value.clearTriggerProps} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TagsInputClearTrigger',
  },
)
