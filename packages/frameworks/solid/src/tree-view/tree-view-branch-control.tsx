// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchControlProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchControl: ArkComponent<'div', BranchProps> = (
  props: TreeViewBranchControlProps,
) => {
  const [branchProps, localProps] = createSplitProps<BranchProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getBranchControlProps(branchProps), localProps)

  return <ark.div {...mergedProps} />
}
