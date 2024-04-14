import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchIndicator = defineComponent<TreeViewBranchIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.div {...api.value.getBranchIndicatorProps(branchProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchIndicator',
  },
)
