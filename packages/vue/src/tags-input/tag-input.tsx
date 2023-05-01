import { computed, defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import type { ComponentWithProps } from '../utils'
import type { TagProps } from './tag'
import { useTagsInputContext } from './tags-input-context'

export type TagInputProps = Assign<HTMLArkProps<'input'>, TagProps>

export const TagInput: ComponentWithProps<TagInputProps> = defineComponent({
  name: 'TagInput',
  props: {
    index: {
      type: [String, Number] as PropType<TagInputProps['index']>,
      required: true,
    },
    value: {
      type: String as PropType<TagInputProps['value']>,
      required: true,
    },
    disabled: {
      type: Boolean as PropType<TagInputProps['disabled']>,
    },
  },
  setup(props, { attrs }) {
    const api = useTagsInputContext()

    const tagInputProps = computed(() => ({
      ...api.value.getTagInputProps({
        index: props.index,
        value: props.value,
        disabled: props.disabled,
      }),
      modelValue: api.value.value[parseInt(props.index.toString())],
    }))

    return () => <ark.input {...tagInputProps.value} {...attrs} />
  },
})
