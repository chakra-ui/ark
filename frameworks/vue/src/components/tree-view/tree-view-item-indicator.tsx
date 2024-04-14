import { defineComponent } from 'vue'
import { type HTMLArkProps, ark } from '../../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewItemContext } from './tree-view-item-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewItemIndicator = defineComponent<TreeViewItemIndicatorProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const itemProps = useTreeViewItemContext()

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
