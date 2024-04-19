import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { type ItemProps, TreeViewBranchProvider } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './use-tree-view-depth-context'

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewBranch = defineComponent<TreeViewBranchProps>(
  (props, { slots, attrs }) => {
    const treeView = useTreeViewContext()
    const depth = useTreeViewDepthContext()

    TreeViewDepthProvider(depth + 1)
    TreeViewBranchProvider({ ...props, depth })

    return () => (
      <ark.li {...treeView.value.getBranchProps({ ...props, depth })} {...attrs}>
        {slots.default?.()}
      </ark.li>
    )
  },
  {
    name: 'TreeViewBranch',
    props: {
      id: {
        type: String as PropType<TreeViewBranchProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchProps['disabled']>,
      },
    },
  },
)
