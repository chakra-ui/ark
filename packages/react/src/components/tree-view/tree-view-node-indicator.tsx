'use client'

import { mergeProps } from '@zag-js/react'
import type { NodeIndicatorType } from '@zag-js/tree-view'
import { forwardRef } from 'react'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory.ts'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeIndicatorBaseProps extends PolymorphicProps {
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

export const TreeViewNodeIndicator = forwardRef<HTMLDivElement, TreeViewNodeIndicatorProps>((props, ref) => {
  const { type, ...rest } = props
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const mergedProps = mergeProps(treeView.getNodeIndicatorProps({ ...nodeProps, type }), rest)

  return <ark.div {...mergedProps} ref={ref} />
})

TreeViewNodeIndicator.displayName = 'TreeViewNodeIndicator'
