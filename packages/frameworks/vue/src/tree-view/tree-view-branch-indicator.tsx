// import type { BranchProps } from '@zag-js/tree-view'
import { treeViewAnatomy } from '@ark-ui/anatomy'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchIndicator = defineComponent<TreeViewBranchIndicatorProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.div
        {...api.value.getBranchProps(props)}
        {...treeViewAnatomy.build().branchIndicator.attrs}
        {...attrs}
      >
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchIndicator',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchIndicatorProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewBranchIndicatorProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchIndicatorProps['disabled']>,
      },
    },
  },
)
