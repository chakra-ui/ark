import { For } from 'solid-js'
import type { JSX } from '@solidjs/web'
import { createSplitProps } from '../../utils/create-split-props.ts'
import { TreeView, useTreeViewContext } from '../tree-view/index.tsx'
import { JsonTreeViewNode, type JsonTreeViewNodeBaseProps } from './json-tree-view-node.tsx'

export interface JsonTreeViewTreeBaseProps extends JsonTreeViewNodeBaseProps {}

export interface JsonTreeViewTreeProps extends TreeView.TreeProps, JsonTreeViewTreeBaseProps {}

const splitTreeNodeProps = createSplitProps<JsonTreeViewNodeBaseProps>()

export const JsonTreeViewTree = (props: JsonTreeViewTreeProps): JSX.Element => {
  const [nodeProps, treeProps] = splitTreeNodeProps(props, ['arrow', 'indentGuide', 'renderValue'])

  const tree = useTreeViewContext()
  const children = () => tree().collection.getNodeChildren(tree().collection.rootNode)

  return (
    <TreeView.Tree data-scope="json-tree-view" {...treeProps}>
      <For each={children()} keyed={false}>
        {(child, index) => <JsonTreeViewNode node={child()} indexPath={[index]} {...nodeProps} />}
      </For>
    </TreeView.Tree>
  )
}
