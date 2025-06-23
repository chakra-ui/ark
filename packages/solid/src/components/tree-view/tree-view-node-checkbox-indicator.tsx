import { type JSX, createMemo } from 'solid-js'
import { useTreeViewNodeContext } from './use-tree-view-node-context'

export interface TreeViewNodeCheckboxIndicatorBaseProps {
  children?: JSX.Element
  indeterminate?: JSX.Element
  fallback?: JSX.Element
}
export interface TreeViewNodeCheckboxIndicatorProps extends TreeViewNodeCheckboxIndicatorBaseProps {}

export const TreeViewNodeCheckboxIndicator = (props: TreeViewNodeCheckboxIndicatorProps) => {
  const nodeState = useTreeViewNodeContext()

  const checkedState = createMemo(() => nodeState().checked)

  if (checkedState() === 'indeterminate' && props.indeterminate) {
    return props.indeterminate
  }

  if (checkedState() === true && props.children) {
    return props.children
  }

  return props.fallback
}
