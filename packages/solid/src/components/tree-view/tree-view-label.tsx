import { mergeProps } from '@zag-js/solid'
import { type HTMLProps, type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TreeViewLabelProps extends HTMLProps<'label'>, TreeViewLabelBaseProps {}

export const TreeViewLabel = (props: TreeViewLabelProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
