// import type { BranchProps } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type BranchProps } from './tree-view-context'

export interface TreeViewBranchTriggerProps extends Assign<HTMLArkProps<'div'>, BranchProps> {}

export const TreeViewBranchTrigger: ArkComponent<'div', BranchProps> = (
  props: TreeViewBranchTriggerProps,
) => {
  const [branchProps, localProps] = createSplitProps<BranchProps>()(props, [
    'depth',
    'id',
    'disabled',
  ])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getBranchTriggerProps(branchProps), localProps)

  return <ark.div {...mergedProps} />
}
