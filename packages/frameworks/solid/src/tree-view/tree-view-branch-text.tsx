// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchTextProps extends Assign<HTMLArkProps<'span'>, BranchProps> {}

export const TreeViewBranchText: ArkComponent<'span', BranchProps> = (
  props: TreeViewBranchTextProps,
) => {
  const [branchProps, localProps] = createSplitProps<BranchProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getBranchTextProps(branchProps), localProps)

  return <ark.span {...mergedProps} />
}
