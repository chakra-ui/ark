import { type PropType, computed, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewDepthContext } from './use-tree-view-depth-context'
import { TreeViewItemProvider } from './use-tree-view-item-context'
import {
  TreeViewItemPropsProvider,
  type UseTreeViewItemPropsContext,
} from './use-tree-view-item-props-context'

export interface TreeViewItemProps
  extends Assign<HTMLArkProps<'li'>, UseTreeViewItemPropsContext> {}

export const TreeViewItem = defineComponent<TreeViewItemProps>(
  (props, { slots, attrs }) => {
    const treeView = useTreeViewContext()
    const depth = useTreeViewDepthContext()

    TreeViewItemProvider(computed(() => treeView.value.getItemState({ ...props, depth })))
    TreeViewItemPropsProvider({ ...props, depth })

    return () => (
      <ark.li {...treeView.value.getItemProps({ ...props, depth })} {...attrs}>
        {slots.default?.()}
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
