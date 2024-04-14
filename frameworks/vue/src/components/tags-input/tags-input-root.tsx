import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import type { Assign } from '~/types'
import { TagsInputProvider } from './tags-input-context'
import { emits, props } from './tags-input.props'
import { type UseTagsInputProps, useTagsInput } from './use-tags-input'

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, UseTagsInputProps> {}

export const TagsInputRoot = defineComponent<TagsInputRootProps>(
  (props, { slots, attrs, emit }) => {
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
  {
    name: 'TagsInputRoot',
    props,
    emits,
  },
)
