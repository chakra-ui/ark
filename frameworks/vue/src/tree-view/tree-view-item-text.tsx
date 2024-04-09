import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewItemContext } from './tree-view-item-context'

export interface TreeViewItemTextProps extends HTMLArkProps<'span'> {}

export const TreeViewItemText = defineComponent<TreeViewItemTextProps>(
  (_, { slots, attrs }) => {
    const api = useTreeViewContext()
    const itemProps = useTreeViewItemContext()

    return () => (
      <ark.span {...api.value.getItemTextProps(itemProps)} {...attrs}>
        {slots.default?.()}
      </ark.span>
    )
  },
  {
    name: 'TreeViewItemText',
  },
)
