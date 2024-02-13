import { treeViewAnatomy } from '@ark-ui/anatomy'
import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchIndicator = defineComponent<TreeViewBranchIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.div
        {...api.value.getBranchProps(branchProps)}
        // TODO replace with api.getBranchIndicatorProps() when available
        {...treeViewAnatomy.build().branchIndicator.attrs}
        {...attrs}
      >
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchIndicator',
  },
)
