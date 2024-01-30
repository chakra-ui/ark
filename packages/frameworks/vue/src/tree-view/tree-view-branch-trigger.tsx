// import type { BranchProps } from '@zag-js/tree-view'
import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends Assign<HTMLArkProps<'button'>, BranchProps> {}

export const TreeViewBranchTrigger = defineComponent<TreeViewBranchTriggerProps>(
  (props, { slots, attrs }) => {
    const api = useTreeViewContext()

    return () => (
      <ark.button {...api.value.getBranchTriggerProps(props)} {...attrs}>
        {slots.default?.()}
      </ark.button>
    )
  },
  {
    name: 'TreeViewBranchTrigger',
    props: {
      depth: {
        type: Number as PropType<TreeViewBranchTriggerProps['depth']>,
        required: true,
      },
      id: {
        type: String as PropType<TreeViewBranchTriggerProps['id']>,
        required: true,
      },
      disabled: {
        type: Boolean as PropType<TreeViewBranchTriggerProps['disabled']>,
      },
    },
  },
)
