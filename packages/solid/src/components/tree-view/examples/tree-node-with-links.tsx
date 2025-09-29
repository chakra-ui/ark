import { TreeView } from '@ark-ui/solid/tree-view'
import { ChevronRight, ExternalLink, File } from 'lucide-solid'
import { type Component, For, Show } from 'solid-js'

interface Node {
  id: string
  name: string
  href?: string
  children?: Node[]
}

interface Props {
  node: Node
  indexPath: number[]
}

export const TreeNodeWithLinks: Component<Props> = (props) => (
  <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
    <Show
      when={props.node.children}
      fallback={
        <TreeView.Item asChild={(itemProps) => <a href={props.node.href} {...itemProps()} />}>
          <TreeView.ItemText>
            <File />
            {props.node.name}
          </TreeView.ItemText>
          <Show when={props.node.href?.startsWith('http')}>
            <ExternalLink size={12} />
          </Show>
        </TreeView.Item>
      }
    >
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>{props.node.name}</TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRight />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          <For each={props.node.children}>
            {(child, index) => <TreeNodeWithLinks node={child} indexPath={[...props.indexPath, index()]} />}
          </For>
        </TreeView.BranchContent>
      </TreeView.Branch>
    </Show>
  </TreeView.NodeProvider>
)
