import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputHiddenInputProps = HTMLArkProps<'input'>

export const TagsInputHiddenInput: ComponentWithProps<TagsInputHiddenInputProps> = defineComponent({
  name: 'TagsInputHiddenInput',
  setup(_, { attrs }) {
    const api = useTagsInputContext()
    return () => <ark.input {...api.value.hiddenInputProps} {...attrs} />
  },
})
