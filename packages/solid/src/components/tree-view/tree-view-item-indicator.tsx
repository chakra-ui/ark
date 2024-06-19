import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemIndicatorBaseProps extends PolymorphicProps<'div'> {}
export interface TreeViewItemIndicatorProps
  extends HTMLProps<'div'>,
    TreeViewItemIndicatorBaseProps {}

export const TreeViewItemIndicator = (props: TreeViewItemIndicatorProps) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
