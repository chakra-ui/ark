import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchTrigger = defineComponent<TreeViewBranchTriggerProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.div {...api.value.getBranchTriggerProps(branchProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchTrigger',
  },
)
