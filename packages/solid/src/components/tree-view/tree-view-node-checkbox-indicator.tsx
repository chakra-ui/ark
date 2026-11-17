import { type JSX, Match, Switch, children } from 'solid-js'
import { useTreeViewNodeContext } from './use-tree-view-node-context.ts'

export interface TreeViewNodeCheckboxIndicatorBaseProps {
  children?: JSX.Element
  indeterminate?: JSX.Element
  fallback?: JSX.Element
}
export interface TreeViewNodeCheckboxIndicatorProps extends TreeViewNodeCheckboxIndicatorBaseProps {}

export const TreeViewNodeCheckboxIndicator = (props: TreeViewNodeCheckboxIndicatorProps) => {
  const nodeState = useTreeViewNodeContext()

  const checked = children(() => props.children)
  const indeterminate = children(() => props.indeterminate)
  const fallback = children(() => props.fallback)

  return (
    <Switch fallback={fallback()}>
      <Match when={nodeState().checked === 'indeterminate' && indeterminate()}>{indeterminate()}</Match>
      <Match when={nodeState().checked === true && checked()}>{checked()}</Match>
    </Switch>
  )
}
