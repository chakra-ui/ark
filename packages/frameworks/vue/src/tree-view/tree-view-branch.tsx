// import type { BranchProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchProps extends Assign<HTMLArkProps<'li'>, BranchProps> {}

export const TreeViewBranch = defineComponent<TreeViewBranchProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.li {...api.value.getBranchProps(props)} {...attrs}>
        {slots.default?.(api.value.getBranchState(props))}
      </ark.li>
    )
  },
  {
    name: 'TreeViewBranch',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchProps['depth']>,
        required: true,
      },
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
