import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseTreeViewItemContext, useTreeViewItemContext } from './use-tree-view-item-context'

export type TreeViewItemContextProps = SlotsType<{
  default: UnwrapRef<UseTreeViewItemContext>
}>

export const TreeViewItemContext = defineComponent(
  (_, { slots }) => {
    const item = useTreeViewItemContext()

    return () => slots.default(item.value)
  },
  {
    name: 'TreeViewItemContext',
    slots: Object as TreeViewItemContextProps,
  },
)
