import { mergeProps } from '@zag-js/solid'
import { ark, type HTMLArkProps } from '../factory'
import { useTreeViewContext } from './tree-view-context'
import { useTreeViewItemContext } from './tree-view-item-context'

export interface TreeViewItemTextProps extends HTMLArkProps<'span'> {}

export const TreeViewItemText = (props: TreeViewItemTextProps) => {
  const api = useTreeViewContext()
  const itemProps = useTreeViewItemContext()
  const mergedProps = mergeProps(() => api().getItemTextProps(itemProps), props)

  return <ark.span {...mergedProps} />
}
