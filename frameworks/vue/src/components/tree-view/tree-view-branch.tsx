import { type PropType, defineComponent } from 'vue'
import type { Assign } from '../../types'
import { type HTMLArkProps, ark } from '../factory'
import { type ItemProps, TreeViewBranchProvider } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'
import { TreeViewDepthProvider, useTreeViewDepthContext } from './tree-view-depth-provider'

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, ItemProps> {}

export const TreeViewBranch = defineComponent<TreeViewBranchProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()
    const depth = useTreeViewDepthContext()

    TreeViewDepthProvider(depth + 1)
    TreeViewBranchProvider({ ...props, depth })

    return () => (
      <ark.li {...api.value.getBranchProps({ ...props, depth })} {...attrs}>
        {slots.default?.(api.value.getBranchState({ ...props, depth }))}
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
