import { computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './tags-input-context'

export interface TagsInputInputProps extends HTMLArkProps<'input'> {}

export const TagsInputInput = defineComponent<TagsInputInputProps>(
  (_, { attrs }) => {
    const api = useTagsInputContext()

    const inputProps = computed(() => ({
      ...api.value.inputProps,
      modelValue: api.value.inputValue,
    }))

    return () => <ark.input {...inputProps.value} {...attrs} />
  },
  {
    name: 'TagsInputInput',
  },
)
