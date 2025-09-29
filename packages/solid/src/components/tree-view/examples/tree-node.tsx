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
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>
            <Folder />
            {props.node.name}
          </TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <For each={props.node.children}>
            {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
          </For>
        </TreeView.BranchContent>
      </TreeView.Branch>
    ) : (
      <TreeView.Item>
        <TreeView.ItemIndicator>
          <SquareCheckBigIcon />
        </TreeView.ItemIndicator>
        <TreeView.ItemText>
          <File />
          {props.node.name}
        </TreeView.ItemText>
      </TreeView.Item>
    )}
  </TreeView.NodeProvider>
)
