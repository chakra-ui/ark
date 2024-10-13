import { type PropTypes, normalizeProps, useMachine } from '@zag-js/solid'
import * as treeView from '@zag-js/tree-view'
import { type Accessor, createMemo, createUniqueId } from 'solid-js'
import { useEnvironmentContext, useLocaleContext } from '../../providers'
import type { Optional } from '../../types'

export interface UseTreeViewProps
  extends Optional<Omit<treeView.Context, 'dir' | 'getRootNode'>, 'id'> {
  /**
   * The initial selected items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultSelectedValue?: treeView.Context['selectedValue']
  /**
   * The initial expanded items of the tree view.
   * Use this when you do not need to control the state of the tree view.
   */
  defaultExpandedValue?: treeView.Context['expandedValue']
}
export interface UseTreeViewReturn extends Accessor<treeView.Api<PropTypes>> {}

export const useTreeView = (props: UseTreeViewProps = {}): UseTreeViewReturn => {
  const locale = useLocaleContext()
  const environment = useEnvironmentContext()
  const id = createUniqueId()

  const context = createMemo(() => ({
    id,
    dir: locale().dir,
    getRootNode: environment().getRootNode,
    selectedValue: props.defaultSelectedValue,
    expandedValue: props.defaultExpandedValue,
    ...props,
  }))

  const [state, send] = useMachine(treeView.machine(context()), { context })
  return createMemo(() => treeView.connect(state, send, normalizeProps))
}
