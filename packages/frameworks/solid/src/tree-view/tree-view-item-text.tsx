// import type { ItemProps } from '@zag-js/tree-view'
import { treeViewAnatomy } from '@ark-ui/anatomy'
import { mergeProps } from '@zag-js/solid'
import { createSplitProps } from '../create-split-props'
import { ark, type ArkComponent, type HTMLArkProps } from '../factory'
import type { Assign } from '../types'
import { useTreeViewContext, type ItemProps } from './tree-view-context'

export interface TreeViewItemTextProps extends Assign<HTMLArkProps<'span'>, ItemProps> {}

export const TreeViewItemText: ArkComponent<'span', ItemProps> = (props: TreeViewItemTextProps) => {
  const [itemProps, localProps] = createSplitProps<ItemProps>()(props, ['depth', 'id', 'disabled'])
  const api = useTreeViewContext()
  const mergedProps = mergeProps(
    () => api().getItemProps(itemProps),
    treeViewAnatomy.build().itemText.attrs,
    localProps,
  )

  return <ark.span {...mergedProps} />
}
