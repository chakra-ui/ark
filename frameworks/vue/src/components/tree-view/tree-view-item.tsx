import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewDepthContext } from './tree-view-depth-provider'
import { type ItemProps, TreeViewItemProvider } from './tree-view-item-context'

export interface TreeViewItemProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewItem = defineComponent<TreeViewItemProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()
    const depth = useTreeViewDepthContext()

    TreeViewItemProvider({ ...props, depth })

    return () => (
      <ark.li {...api.value.getItemProps({ ...props, depth })} {...attrs}>
        {slots.default?.(api.value.getItemState({ ...props, depth }))}
      </ark.li>
    )
  },
  {
    name: 'TreeViewItem',
    props: {
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
