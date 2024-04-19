import type { ItemProps } from '@zag-js/tags-input'
import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTagsInputContext } from './use-tags-input-context'
import { TagsInputItemProvider } from './use-tags-input-item-context'
import { TagsInputItemPropsProvider } from './use-tags-input-item-props-context'

export interface TagsInputItemProps extends Assign<HTMLArkProps<'div'>, ItemProps> {}

export const TagsInputItem = defineComponent<TagsInputItemProps>(
  (props, { slots, attrs }) => {
    const api = useTagsInputContext()

    TagsInputItemPropsProvider(props)
    TagsInputItemProvider(computed(() => api.value.getItemState(props)))

    return () => (
      <ark.div {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.()}
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
