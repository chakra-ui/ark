import { mergeProps } from '@zag-js/solid'
import { type HTMLArkProps, ark } from '~/factory'
import { useTreeViewContext } from './use-tree-view-context'

export interface TreeViewLabelProps extends HTMLArkProps<'label'> {}

export const TreeViewLabel = (props: TreeViewLabelProps) => {
  const api = useTreeViewContext()
  const mergedProps = mergeProps(() => api().labelProps, props)

  return <ark.label {...mergedProps} />
}
