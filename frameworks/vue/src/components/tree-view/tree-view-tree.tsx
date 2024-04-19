import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider } from './use-tree-view-depth-context'

export interface TreeViewTreeProps extends HTMLArkProps<'ul'> {}

export const TreeViewTree = defineComponent<TreeViewTreeProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    TreeViewDepthProvider(1)

    return () => (
      <ark.ul {...api.value.treeProps} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
  {
    name: 'TreeViewTree',
  },
)
