import { TreeView } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, SquareCheckBigIcon, SquareMinusIcon } from 'lucide-solid'
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
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeCheckbox>
              <TreeView.NodeIndicator type="checked">
                <SquareCheckBigIcon />
              </TreeView.NodeIndicator>
              <TreeView.NodeIndicator type="indeterminate">
                <SquareMinusIcon />
              </TreeView.NodeIndicator>
            </TreeView.NodeCheckbox>
            <TreeView.NodeText>{props.node.name}</TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
      }
    >
      <TreeView.NodeGroup>
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeCheckbox>
              <TreeView.NodeIndicator type="checked">
                <SquareCheckBigIcon />
              </TreeView.NodeIndicator>
              <TreeView.NodeIndicator type="indeterminate">
                <SquareMinusIcon />
              </TreeView.NodeIndicator>
            </TreeView.NodeCheckbox>
            <TreeView.NodeText>{props.node.name}</TreeView.NodeText>
            <TreeView.NodeExpandTrigger>
              <TreeView.NodeIndicator type="expanded">
                <ChevronRightIcon />
              </TreeView.NodeIndicator>
            </TreeView.NodeExpandTrigger>
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent>
          <TreeView.IndentGuide />
          <For each={props.node.children}>
            {(child, childIndex) => (
              <TreeNodeWithCheckbox node={child} indexPath={[...props.indexPath, childIndex()]} />
            )}
          </For>
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    </Show>
  </TreeView.NodeProvider>
)
