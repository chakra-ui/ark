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
        <TreeView.Node>
          <TreeView.Cell asChild={(cellProps) => <a href={props.node.href} {...cellProps()} />}>
            <TreeView.NodeText>
              <File />
              {props.node.name}
            </TreeView.NodeText>
            <Show when={props.node.href?.startsWith('http')}>
              <ExternalLink size={12} />
            </Show>
          </TreeView.Cell>
        </TreeView.Node>
      }
    >
      <TreeView.NodeGroup>
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeText>{props.node.name}</TreeView.NodeText>
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
            {(child, index) => <TreeNodeWithLinks node={child} indexPath={[...props.indexPath, index()]} />}
          </For>
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    </Show>
  </TreeView.NodeProvider>
)
