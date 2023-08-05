import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { ComponentWithProps } from '../utils'
import { useTagsInputContext } from './tags-input-context'

export type TagsInputInputProps = HTMLArkProps<'input'>

export const TagsInputInput: ComponentWithProps<TagsInputInputProps> = defineComponent({
  name: 'TagsInputInput',
  setup(_, { attrs }) {
    const api = useTagsInputContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.inputValue,
    }))

    return () => <ark.input {...inputProps.value} {...attrs} />
  },
})
