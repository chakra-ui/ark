import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { TreeViewDepthProvider } from './tree-view-depth-provider'
import { useTreeViewContext } from './use-tree-view-context'

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
