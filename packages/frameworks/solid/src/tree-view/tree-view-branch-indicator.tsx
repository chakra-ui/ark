import { mergeProps } from '@zag-js/solid'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import { useTreeViewBranchContext } from './tree-view-branch-context'
import { useTreeViewContext } from './tree-view-context'

export interface TreeViewBranchIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewBranchIndicator: ArkComponent<'div'> = (
  props: TreeViewBranchIndicatorProps,
) => {
  const api = useTreeViewContext()
  const branchProps = useTreeViewBranchContext()
  const mergedProps = mergeProps(() => api().getBranchIndicatorProps(branchProps), props)

  return <ark.div {...mergedProps} />
}
