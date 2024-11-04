'use client'
import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'
import { forwardRef } from 'react'
import * as ArkTreeView from './primitives/tree-view'

interface Node {
  id: string
  name: string
  children?: Node[]
}

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

const TreeNode = (props: ArkTreeView.NodeProviderProps) => {
  const { node, indexPath } = props
  return (
    <ArkTreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <ArkTreeView.Branch>
          <ArkTreeView.BranchControl>
            <ArkTreeView.BranchText>
              <FolderIcon /> {node.name}
            </ArkTreeView.BranchText>
            <ArkTreeView.BranchIndicator>
              <ChevronRightIcon />
            </ArkTreeView.BranchIndicator>
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
          <ArkTreeView.ItemIndicator>
            <CheckSquareIcon />
          </ArkTreeView.ItemIndicator>
          <ArkTreeView.ItemText>
            <FileIcon />
            {node.name}
          </ArkTreeView.ItemText>
        </ArkTreeView.Item>
      )}
    </ArkTreeView.NodeProvider>
  )
}
