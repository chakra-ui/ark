import { TreeView } from '@ark-ui/solid/tree-view'
import { ChevronRight, File, Folder, SquareCheckBigIcon } from 'lucide-solid'
import { type Component, For } from 'solid-js'

interface Node {
  id: string
  name: string
  children?: Node[]
}

interface Props {
  node: Node
  indexPath: number[]
}

export const TreeNode: Component<Props> = (props) => (
  <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
    {props.node.children ? (
      <TreeView.NodeGroup>
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeText>
              <Folder />
              {props.node.name}
            </TreeView.NodeText>
            <TreeView.NodeExpandTrigger>
              <TreeView.NodeIndicator type="expanded">
                <ChevronRight />
              </TreeView.NodeIndicator>
            </TreeView.NodeExpandTrigger>
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent>
          <TreeView.IndentGuide />
          <For each={props.node.children}>
            {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
          </For>
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    ) : (
      <TreeView.Node>
        <TreeView.Cell>
          <TreeView.NodeIndicator type="selected">
            <SquareCheckBigIcon />
          </TreeView.NodeIndicator>
          <TreeView.NodeText>
            <File />
            {props.node.name}
          </TreeView.NodeText>
        </TreeView.Cell>
      </TreeView.Node>
    )}
  </TreeView.NodeProvider>
)
