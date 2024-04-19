import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewItemIndicator = defineComponent<TreeViewItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const itemProps = useTreeViewItemPropsContext()

    return () => (
      <ark.div {...api.value.getItemIndicatorProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.div>
    )
  },
  {
    name: 'TreeViewItemIndicator',
  },
)
