import { TreeView } from '@ark-ui/solid/tree-view'
import { ChevronRight, File, Folder, LoaderCircleIcon, SquareCheckBigIcon } from 'lucide-solid'
import { type Component, For, Show } from 'solid-js'

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

interface Props {
  node: Node
  indexPath: number[]
}

export const AsyncTreeNode: Component<Props> = (props) => (
  <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
    <Show
      when={props.node.children || props.node.childrenCount}
      fallback={
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
      }
    >
      <TreeView.NodeGroup>
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeText>
              <TreeView.NodeContext>
                {(context) => (
                  <Show when={context().loading} fallback={<Folder />}>
                    <LoaderCircleIcon style={{ animation: 'spin 1s infinite' }} />
                  </Show>
                )}
              </TreeView.NodeContext>
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
          <Show when={props.node.children}>
            {(children) => (
              <For each={children()}>
                {(child, index) => <AsyncTreeNode node={child} indexPath={[...props.indexPath, index()]} />}
              </For>
            )}
          </Show>
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    </Show>
  </TreeView.NodeProvider>
)
