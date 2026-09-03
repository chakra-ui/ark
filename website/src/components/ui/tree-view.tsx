'use client'
import { useTreeViewNodeContext } from '@ark-ui/react'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { forwardRef } from 'react'
import * as ArkTreeView from './primitives/tree-view'

interface NodeData {
  id: string
  name: string
  children?: NodeData[]
}

export const TreeView = forwardRef<HTMLDivElement, ArkTreeView.RootProps>((props, ref) => {
  const rootNodes: NodeData[] = props.collection.rootNode.children ?? []
  return (
    <ArkTreeView.Root ref={ref} {...props}>
      <ArkTreeView.Tree>
        {rootNodes.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </ArkTreeView.Tree>
    </ArkTreeView.Root>
  )
})

TreeView.displayName = 'TreeView'

function BranchIcon() {
  const nodeState = useTreeViewNodeContext()
  return nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const TreeNode = (props: ArkTreeView.NodeProviderProps) => {
  const { indexPath } = props
  const node: NodeData = props.node
  const children = node.children
  return (
    <ArkTreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {children ? (
        <ArkTreeView.NodeGroup>
          <ArkTreeView.Node>
            <ArkTreeView.Cell>
              <ArkTreeView.NodeExpandTrigger>
                <ArkTreeView.NodeIndicator type="expanded">
                  <ChevronRightIcon />
                </ArkTreeView.NodeIndicator>
              </ArkTreeView.NodeExpandTrigger>
              <ArkTreeView.NodeText>
                <BranchIcon /> {node.name}
              </ArkTreeView.NodeText>
            </ArkTreeView.Cell>
          </ArkTreeView.Node>
          <ArkTreeView.NodeGroupContent>
            <ArkTreeView.IndentGuide />
            {children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </ArkTreeView.NodeGroupContent>
        </ArkTreeView.NodeGroup>
      ) : (
        <ArkTreeView.Node>
          <ArkTreeView.Cell>
            <ArkTreeView.NodeText>
              <FileIcon />
              {node.name}
            </ArkTreeView.NodeText>
          </ArkTreeView.Cell>
        </ArkTreeView.Node>
      )}
    </ArkTreeView.NodeProvider>
  )
}
