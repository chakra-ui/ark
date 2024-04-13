import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useTreeViewContext } from './use-tree-view-context'
import { useTreeViewItemContext } from './use-tree-view-item-context'

export interface TreeViewItemTextProps extends HTMLArkProps<'span'> {}

export const TreeViewItemText = (props: TreeViewItemTextProps) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
