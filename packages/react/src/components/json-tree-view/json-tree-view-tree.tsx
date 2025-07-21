import { forwardRef } from 'react'
import { createSplitProps } from '../../utils/create-split-props'
import { TreeView, useTreeViewContext } from '../tree-view'
import { JsonTreeViewNode, type JsonTreeViewNodeBaseProps } from './json-tree-view-node'

export interface JsonTreeViewTreeProps extends TreeView.TreeProps, JsonTreeViewNodeBaseProps {}

const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()

export const JsonTreeViewTree = forwardRef<HTMLDivElement, JsonTreeViewTreeProps>((props, ref) => {
  const [nodeProps, treeProps] = splitTreeNodeProps(props, ['arrow', 'indentGuide', 'renderValue'])
  const tree = useTreeViewContext()
  const children = tree.collection.getNodeChildren(tree.collection.rootNode)
  return (
    <TreeView.Tree data-scope="json-tree-view" {...treeProps} ref={ref}>
      {children.map((child, index) => (
        <JsonTreeViewNode key={index} node={child} indexPath={[index]} {...nodeProps} />
      ))}
    </TreeView.Tree>
  )
})

JsonTreeViewTree.displayName = 'JsonTreeViewTree'
