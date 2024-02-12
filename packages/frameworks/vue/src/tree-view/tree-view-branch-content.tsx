// import type { BranchProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchContentProps extends Assign<HTMLArkProps<'ul'>, BranchProps> {}

export const TreeViewBranchContent = defineComponent<TreeViewBranchContentProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.ul {...api.value.getBranchContentProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.ul>
    )
  },
  {
    name: 'TreeViewBranchContent',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchContentProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewBranchContentProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchContentProps['disabled']>,
      },
    },
  },
)
