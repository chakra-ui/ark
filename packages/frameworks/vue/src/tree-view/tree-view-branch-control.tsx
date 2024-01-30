// import type { BranchProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchControlProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchControl = defineComponent<TreeViewBranchControlProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.div {...api.value.getBranchControlProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewBranchControl',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchControlProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewBranchControlProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchControlProps['disabled']>,
      },
    },
  },
)
