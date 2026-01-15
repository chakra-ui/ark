'use client'

import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useId } from 'react'
import menuStyles from 'styles/menu.module.css'
import styles from 'styles/tree-view.module.css'

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
          <Menu.Content className={menuStyles.Content}>
            <Menu.Item className={menuStyles.Item} value="rename">
              Rename
            </Menu.Item>
            <Menu.Item className={menuStyles.Item} value="delete">
              Delete
            </Menu.Item>
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
    <TreeView.Root className={styles.Root} collection={collection} ids={{ node: (value) => getNodeId(uid, value) }}>
      <TreeView.Label className={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree className={styles.Tree}>
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
      <TreeView.NodeContext>
        {(nodeState) =>
          node.children ? (
            <TreeView.Branch className={styles.Branch}>
              <TreeNodeContextMenu triggerId={triggerId}>
                <TreeView.BranchControl className={styles.BranchControl} asChild>
                  <Menu.ContextTrigger>
                    <TreeView.BranchIndicator className={styles.BranchIndicator}>
                      <ChevronRightIcon />
                    </TreeView.BranchIndicator>
                    <TreeView.BranchText className={styles.BranchText}>
                      {nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                      {node.name}
                    </TreeView.BranchText>
                  </Menu.ContextTrigger>
                </TreeView.BranchControl>
              </TreeNodeContextMenu>
              <TreeView.BranchContent className={styles.BranchContent}>
                <TreeView.BranchIndentGuide className={styles.BranchIndentGuide} />
                {node.children.map((child, index) => (
                  <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} triggerId={triggerId} />
                ))}
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeNodeContextMenu triggerId={triggerId}>
              <TreeView.Item className={styles.Item} asChild>
                <Menu.ContextTrigger>
                  <FileIcon />
                  <TreeView.ItemText className={styles.ItemText}>{node.name}</TreeView.ItemText>
                </Menu.ContextTrigger>
              </TreeView.Item>
            </TreeNodeContextMenu>
          )
        }
      </TreeView.NodeContext>
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
