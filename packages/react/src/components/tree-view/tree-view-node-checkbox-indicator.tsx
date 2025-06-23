import type { HTMLProps } from '../factory'
import { useTreeViewNodeContext } from './use-tree-view-node-context'

export interface TreeViewNodeCheckboxIndicatorBaseProps {
  children?: React.ReactNode | undefined
  indeterminate?: React.ReactNode | undefined
  fallback?: React.ReactNode | undefined
}
export interface TreeViewNodeCheckboxIndicatorProps extends HTMLProps<'span'>, TreeViewNodeCheckboxIndicatorBaseProps {}

export const TreeViewNodeCheckboxIndicator = (props: TreeViewNodeCheckboxIndicatorProps) => {
  const { children, indeterminate, fallback } = props
  const nodeState = useTreeViewNodeContext()
  const checkedState = nodeState.checked

  if (checkedState === 'indeterminate' && indeterminate) {
    return <>{indeterminate}</>
  }

  if (checkedState === true && children) {
    return <>{children}</>
  }

  return <>{fallback}</>
}

TreeViewNodeCheckboxIndicator.displayName = 'TreeViewNodeCheckboxIndicator'
