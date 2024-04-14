import type { ItemProps } from '@zag-js/tags-input'
import { type PropType, computed, defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import type { Assign } from '../../types'
import { useTagsInputContext } from './tags-input-context'
import { TagsInputItemProvider } from './tags-input-item-context'

export interface TagsInputItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const TagsInputItem = defineComponent<TagsInputItemProps>(
  (props, { slots, attrs }) => {
    const api = useTagsInputContext()
    TagsInputItemProvider(computed(() => props))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
      </ark.div>
    )
  },
  {
    name: 'TagsInputItem',
    props: {
      index: {
        type: [String, Number] as PropType<ItemProps['index']>,
        required: true,
      },
      value: {
        type: String as PropType<ItemProps['value']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<ItemProps['disabled']>,
      },
    },
  },
)
