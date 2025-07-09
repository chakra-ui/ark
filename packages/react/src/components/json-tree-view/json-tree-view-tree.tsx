import { createSplitProps } from '../../utils/create-split-props'
import { TreeView, useTreeViewContext } from '../tree-view'
import { JsonTreeViewNode, type JsonTreeViewNodeBaseProps } from './json-tree-view-node'

export interface JsonTreeViewTreeProps extends TreeView.TreeProps, JsonTreeViewNodeBaseProps {}

export const JsonTreeViewTree = (props: JsonTreeViewTreeProps) => {
  const [nodeProps, treeProps] = createSplitProps<JsonTreeViewNodeBaseProps>()(props, ['arrowIcon', 'showIndentGuide'])
  const tree = useTreeViewContext()
  const children = tree.collection.getNodeChildren(tree.collection.rootNode)
  return (
    <TreeView.Tree {...treeProps}>
      {children.map((child, index) => (
        <JsonTreeViewNode key={child.id} node={child} indexPath={[index]} {...nodeProps} />
      ))}
    </TreeView.Tree>
  )
}
