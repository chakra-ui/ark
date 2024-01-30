// import type { ItemProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps } from './tree-view-context'

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewItem = defineComponent<TreeViewItemProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.li {...api.value.getItemProps(props)} {...attrs}>
        {slots.default?.(api.value.getItemState(props))}
      </ark.li>
    )
  },
  {
    name: 'TreeViewItem',
    props: {
      depth: {
        type: Number as PropType<TreeViewItemProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewItemProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewItemProps['disabled']>,
      },
    },
  },
)
