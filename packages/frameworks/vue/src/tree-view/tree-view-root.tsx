import { defineComponent } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { TreeViewProvider } from './tree-view-context'
import { emits, props } from './tree-view.props'
import { useTreeView, type UseTreeViewProps } from './use-tree-view'

export interface TreeViewRootProps extends Assign<HTMLArkProps<'div'>, UseTreeViewProps> {}

export const TreeViewRoot = defineComponent<TreeViewRootProps>(
  (props, { slots, attrs, emit }) => {
    const api = useTreeView(props, emit)
    TreeViewProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        {slots.default?.(api.value)}
      </ark.div>
    )
  },
  {
    name: 'TreeViewRoot',
    props,
    emits,
  },
)
