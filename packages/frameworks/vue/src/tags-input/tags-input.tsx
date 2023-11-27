import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { TagsInputProvider } from './tags-input-context'
import { emits, props } from './tags-input.props'
import { useTagsInput, type UseTagsInputProps } from './use-tags-input'

export type TagsInputProps = Assign<HTMLArkProps<'div'>, UseTagsInputProps>

export const TagsInput = defineComponent({
  name: 'TagsInput',
  props,
  emits,
  setup(props, { slots, attrs, emit }) {
    const api = useTagsInput(props, emit)
    TagsInputProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.(api.value)}
        </ark.div>
        <input {...api.value.hiddenInputProps} />
      </>
    )
  },
})
