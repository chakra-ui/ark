import { defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { emits, props } from './tags-input.props'
import { type UseTagsInputProps, useTagsInput } from './use-tags-input'
import { TagsInputProvider } from './use-tags-input-context'

export interface TagsInputRootProps extends Assign<HTMLArkProps<'div'>, UseTagsInputProps> {}

export const TagsInputRoot = defineComponent<TagsInputRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTagsInput(props, emit)
    TagsInputProvider(api)

    return () => (
      <>
        <ark.div {...api.value.rootProps} {...attrs}>
          {slots.default?.()}
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
