import type { NodeIndicatorType } from '@zag-js/tree-view'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeIndicatorBaseProps extends PolymorphicProps<'div'> {
  /**
   * The type of indicator
   * - "expanded": always visible, reflects open/closed state
   * - "selected": shown when the node is selected
   * - "checked": shown when the node is checked
   * - "indeterminate": shown when the node is indeterminate (partially checked)
   */
  type: NodeIndicatorType
}
export interface TreeViewNodeIndicatorProps extends HTMLProps<'div'>, TreeViewNodeIndicatorBaseProps {}

export const TreeViewNodeIndicator = (props: TreeViewNodeIndicatorProps) => {
  const [typeProps, localProps] = createSplitProps<{ type: NodeIndicatorType }>()(props, ['type'])
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(
    () => treeView().getNodeIndicatorProps({ ...nodeProps, type: typeProps.type }),
    localProps,
  )

  return <ark.div {...mergedProps} />
}
