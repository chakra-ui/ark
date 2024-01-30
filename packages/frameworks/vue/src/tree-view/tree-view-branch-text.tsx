// import type { BranchProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchTextProps extends Assign<HTMLArkProps<'span'>, BranchProps> {}

export const TreeViewBranchText = defineComponent<TreeViewBranchTextProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.span {...api.value.getBranchTextProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'TreeViewBranchText',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchTextProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewBranchTextProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchTextProps['disabled']>,
      },
    },
  },
)
