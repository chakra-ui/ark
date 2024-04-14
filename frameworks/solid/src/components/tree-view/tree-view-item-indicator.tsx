import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemIndicatorProps extends HTMLArkProps<'div'> {}

export const TreeViewItemIndicator = (props: TreeViewItemIndicatorProps) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemContext()
  const mergedProps = mergeProps(() => api().getItemIndicatorProps(itemProps), props)

  return <ark.div {...mergedProps} />
}
