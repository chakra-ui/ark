import { computed, defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput = defineComponent({
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
