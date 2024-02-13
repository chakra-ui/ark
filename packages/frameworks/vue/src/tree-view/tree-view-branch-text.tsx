import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchTextProps extends HTMLArkProps<'span'> {}

export const TreeViewBranchText = defineComponent<TreeViewBranchTextProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const branchProps = useTreeViewBranchContext()

    return () => (
      <ark.span {...api.value.getBranchTextProps(branchProps)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'TreeViewBranchText',
  },
)
