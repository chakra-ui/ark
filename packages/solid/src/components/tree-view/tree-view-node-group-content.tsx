import { mergeProps } from '@zag-js/solid'
import { createMemo } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { Collapsible } from '../collapsible/index.tsx'
import type { HTMLProps, PolymorphicProps } from '../factory.tsx'
import { useTreeViewContext } from './use-tree-view-context.ts'
import { useTreeViewNodePropsContext } from './use-tree-view-node-props-context.ts'

export interface TreeViewNodeGroupContentBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewNodeGroupContentProps extends HTMLProps<'div'>, TreeViewNodeGroupContentBaseProps {}

interface VisibilityProps {
  hidden?: boolean
  'data-state'?: string
}

const splitVisibilityProps = createSplitProps<VisibilityProps>()

export const TreeViewNodeGroupContent = (props: TreeViewNodeGroupContentProps) => {
  const treeView = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()

  const nodeGroupContentProps = createMemo(() => {
    const contentProps = treeView().getNodeGroupContentProps(nodeProps)
    const [, ownProps] = splitVisibilityProps(contentProps as VisibilityProps, ['hidden', 'data-state'])
    return ownProps
  })
  const mergedProps = mergeProps(() => nodeGroupContentProps(), props)

  return <Collapsible.Content {...mergedProps} />
}
