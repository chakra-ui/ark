import { TreeView } from '@ark-ui/solid/tree-view'
import { SquareCheckBigIcon, ChevronRightIcon, SquareMinusIcon, SquareIcon } from 'lucide-solid'
import { type Component, For, Show } from 'solid-js'

interface Node {
  id: string
  name: string
  children?: Node[] | undefined
}

interface Props {
  node: Node
  indexPath: number[]
}

export const TreeNodeWithCheckbox: Component<Props> = (props) => (
  <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
    <Show
      when={props.node.children}
      fallback={
        <TreeView.Item>
          <TreeView.NodeCheckbox>
            <TreeView.NodeCheckboxIndicator fallback={<SquareIcon />} indeterminate={<SquareMinusIcon />}>
              <SquareCheckBigIcon />
            </TreeView.NodeCheckboxIndicator>
          </TreeView.NodeCheckbox>
          <TreeView.ItemText>{props.node.name}</TreeView.ItemText>
        </TreeView.Item>
      }
    >
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.NodeCheckbox>
            <TreeView.NodeCheckboxIndicator fallback={<SquareIcon />} indeterminate={<SquareMinusIcon />}>
              <SquareCheckBigIcon />
            </TreeView.NodeCheckboxIndicator>
          </TreeView.NodeCheckbox>
          <TreeView.BranchText>{props.node.name}</TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <For each={props.node.children}>
            {(child, childIndex) => (
              <TreeNodeWithCheckbox node={child} indexPath={[...props.indexPath, childIndex()]} />
            )}
          </For>
        </TreeView.BranchContent>
      </TreeView.Branch>
    </Show>
  </TreeView.NodeProvider>
)
