import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewBranchContext } from './use-tree-view-branch-context'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewBranchContentProps extends HTMLArkProps<'ul'> {}

export const TreeViewBranchContent = defineComponent<TreeViewBranchContentProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.ul {...api.value.getBranchContentProps(branchProps)} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
  {
    name: 'TreeViewBranchContent',
  },
)
