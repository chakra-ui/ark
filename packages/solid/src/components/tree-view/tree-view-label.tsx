import { mergeProps } from '@zag-js/solid'
import type { JSX } from 'solid-js'
import { type PolymorphicProps, ark } from '../factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelBaseProps extends PolymorphicProps<'label'> {}
export interface TreeViewLabelProps
  extends JSX.LabelHTMLAttributes<HTMLLabelElement>,
    TreeViewLabelBaseProps {}

export const TreeViewLabel = (props: TreeViewLabelProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().getLabelProps(), props)

  return <ark.label {...mergedProps} />
}
