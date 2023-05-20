import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { getValidChildren } from '../utils'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputLabelProps = HTMLArkProps<'label'>

export const TagsInputLabel = defineComponent({
  name: 'TagsInputLabel',
  setup(_, { slots, attrs }) {
    const api = useTagsInputContext()

    return () => (
      <ark.label {...api.value.labelProps} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.label>
    )
  },
})
