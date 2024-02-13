import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider } from './tree-view-depth-provider'

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
