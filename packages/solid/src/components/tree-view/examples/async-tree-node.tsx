import { TreeView } from '@ark-ui/solid/tree-view'
import { SquareCheckBigIcon, ChevronRight, File, Folder, LoaderCircleIcon } from 'lucide-solid'
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
        <TreeView.Item>
          <TreeView.ItemIndicator>
            <SquareCheckBigIcon />
          </TreeView.ItemIndicator>
          <TreeView.ItemText>
            <File />
            {props.node.name}
          </TreeView.ItemText>
        </TreeView.Item>
      }
    >
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>
            <TreeView.NodeContext>
              {(context) => (
                <Show when={context().loading} fallback={<Folder />}>
                  <LoaderCircleIcon style={{ animation: 'spin 1s infinite' }} />
                </Show>
              )}
            </TreeView.NodeContext>
            {props.node.name}
          </TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <Show when={props.node.children}>
            {(children) => (
              <For each={children()}>
                {(child, index) => <AsyncTreeNode node={child} indexPath={[...props.indexPath, index()]} />}
              </For>
            )}
          </Show>
        </TreeView.BranchContent>
      </TreeView.Branch>
    </Show>
  </TreeView.NodeProvider>
)
