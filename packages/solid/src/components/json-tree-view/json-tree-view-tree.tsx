import { Index, type JSX } from 'solid-js'
import { createSplitProps } from '../../utils/create-split-props'
import { TreeView, useTreeViewContext } from '../tree-view'
import { JsonTreeViewNode, type JsonTreeViewNodeBaseProps } from './json-tree-view-node'

export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

export interface JsonTreeViewTreeProps extends TreeView.TreeProps, JsonTreeViewTreeBaseProps {}

const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()

export const JsonTreeViewTree = (props: JsonTreeViewTreeProps): JSX.Element => {
  const [nodeProps, treeProps] = splitTreeNodeProps(props, ['arrow', 'indentGuide', 'renderValue'])

  const tree = useTreeViewContext()
  const children = () => tree().collection.getNodeChildren(tree().collection.rootNode)

  return (
    <TreeView.Tree data-scope="json-tree-view" {...treeProps}>
      <Index each={children()}>
        {(child, index) => <JsonTreeViewNode node={child()} indexPath={[index]} {...nodeProps} />}
      </Index>
    </TreeView.Tree>
  )
}
