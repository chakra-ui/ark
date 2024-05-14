import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemPropsContext } from './use-tree-view-item-props-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewItemIndicator = (props: TreeViewItemIndicatorProps) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemPropsContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
