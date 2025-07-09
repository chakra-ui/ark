'use client'

import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { useId } from 'react'

interface TreeNodeContextMenuProps extends Menu.RootProps {
  triggerId: string
  children: React.ReactNode
}

const TreeNodeContextMenu = (props: TreeNodeContextMenuProps) => {
  const { children, triggerId, ...rest } = props
  return (
    <Menu.Root {...rest} ids={{ contextTrigger: triggerId }}>
      {children}
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="rename">Rename</Menu.Item>
            <Menu.Item value="delete">Delete</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const getNodeId = (uid: string, node: string) => `${uid}/${node}`

export const ContextMenu = () => {
  const uid = useId()
  return (
    <TreeView.Root collection={collection} ids={{ node: (value) => getNodeId(uid, value) }}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} triggerId={getNodeId(uid, node.id)} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node> & { triggerId: string }) => {
  const { node, indexPath, triggerId } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeNodeContextMenu triggerId={triggerId}>
            <TreeView.BranchControl asChild>
              <Menu.ContextTrigger>
                <TreeView.BranchText>{node.name}</TreeView.BranchText>
              </Menu.ContextTrigger>
            </TreeView.BranchControl>
          </TreeNodeContextMenu>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} triggerId={triggerId} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeNodeContextMenu triggerId={triggerId}>
          <TreeView.Item asChild>
            <Menu.ContextTrigger>
              <TreeView.ItemText>{node.name}</TreeView.ItemText>
            </Menu.ContextTrigger>
          </TreeView.Item>
        </TreeNodeContextMenu>
      )}
    </TreeView.NodeProvider>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
}

const collection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      {
        id: 'node_modules',
        name: 'node_modules',
        children: [
          { id: 'node_modules/zag-js', name: 'zag-js' },
          { id: 'node_modules/pandacss', name: 'panda' },
          {
            id: 'node_modules/@types',
            name: '@types',
            children: [
              { id: 'node_modules/@types/react', name: 'react' },
              { id: 'node_modules/@types/react-dom', name: 'react-dom' },
            ],
          },
        ],
      },
      {
        id: 'src',
        name: 'src',
        children: [
          { id: 'src/app.tsx', name: 'app.tsx' },
          { id: 'src/index.ts', name: 'index.ts' },
        ],
      },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
