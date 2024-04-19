import { type SlotsType, type UnwrapRef, defineComponent } from 'vue'
import { type UseTreeViewContext, useTreeViewContext } from './use-tree-view-context'

export type TreeViewContextProps = SlotsType<{
  default: UnwrapRef<UseTreeViewContext>
}>

export const TreeViewContext = defineComponent(
  (_, { slots }) => {
    const treeView = useTreeViewContext()

    return () => slots.default(treeView.value)
  },
  {
    name: 'TreeViewContext',
    slots: Object as TreeViewContextProps,
  },
)
