import { defineComponent, ref, type PropType } from 'vue'
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

    const valueAtIndex = api.value.value[parseInt(props.index.toString())]

    const tagInputValue = ref(valueAtIndex)

    // https://github.com/chakra-ui/polymorphic/blob/5ed49fa01adf880e355edcb9f15973fcfe8e6761/packages/vue/src/use-v-model.ts#L30
    const handleOnInput = (_, value) => {
      tagInputValue.value = value
    }

    return () => (
      <ark.input
        value={tagInputValue.value}
        onInput={handleOnInput}
        {...api.value.getTagInputProps({
          index: props.index,
          value: props.value,
          disabled: props.disabled,
        })}
        {...attrs}
      />
    )
  },
})
