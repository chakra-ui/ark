import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '~/factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchControlProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchControl = defineComponent<TreeViewBranchControlProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.div {...api.value.getBranchControlProps(branchProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchControl',
  },
)
