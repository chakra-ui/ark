'use client'
import { useTreeViewNodeContext } from '@ark-ui/react'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { forwardRef } from 'react'
import * as ArkTreeView from './primitives/tree-view'

export const TreeView = forwardRef<HTMLDivElement, ArkTreeView.RootProps>((props, ref) => {
  return (
    <ArkTreeView.Root ref={ref} {...props}>
      <ArkTreeView.Tree>
        {/* @ts-expect-error */}
        {props.collection.rootNode.children.map((node, index) => (
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
  const { node, indexPath } = props
  return (
    <ArkTreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <ArkTreeView.Branch>
          <ArkTreeView.BranchControl>
            <ArkTreeView.BranchIndicator>
              <ChevronRightIcon />
            </ArkTreeView.BranchIndicator>
            <ArkTreeView.BranchText>
              <BranchIcon /> {node.name}
            </ArkTreeView.BranchText>
          </ArkTreeView.BranchControl>
          <ArkTreeView.BranchContent>
            <ArkTreeView.BranchIndentGuide />
            {/* @ts-expect-error */}
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </ArkTreeView.BranchContent>
        </ArkTreeView.Branch>
      ) : (
        <ArkTreeView.Item>
          <ArkTreeView.ItemText>
            <FileIcon />
            {node.name}
          </ArkTreeView.ItemText>
        </ArkTreeView.Item>
      )}
    </ArkTreeView.NodeProvider>
  )
}
