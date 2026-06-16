import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useState } from 'react'

import styles from 'styles/tree-view.module.css'

export const RenameNode = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <TreeView.Root
      className={styles.Root}
      collection={collection}
      canRename={() => true}
      onRenameComplete={(details) => {
        setCollection((prev) => {
          const node = prev.at(details.indexPath)
          if (!node) return prev
          return prev.replace(details.indexPath, { ...node, name: details.label })
        })
      }}
    >
      <TreeView.Label className={styles.Label}>Tree (Press F2 to rename)</TreeView.Label>
      <TreeView.Tree className={styles.Tree}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.NodeContext>
        {(nodeState) =>
          nodeState.isBranch ? (
            <TreeView.NodeGroup className={styles.NodeGroup}>
              <TreeView.Node className={styles.Node}>
                <TreeView.Cell className={styles.Cell}>
                  <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                    <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                      <ChevronRightIcon />
                    </TreeView.NodeIndicator>
                  </TreeView.NodeExpandTrigger>
                  {nodeState.renaming ? (
                    <TreeView.NodeRenameInput className={styles.NodeRenameInput} />
                  ) : (
                    <TreeView.NodeText className={styles.NodeText}>
                      {nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />}
                      {node.name}
                    </TreeView.NodeText>
                  )}
                </TreeView.Cell>
              </TreeView.Node>
              <TreeView.NodeGroupContent className={styles.NodeGroupContent}>
                <TreeView.IndentGuide className={styles.IndentGuide} />
                {node.children?.map((child, index) => (
                  <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
                ))}
              </TreeView.NodeGroupContent>
            </TreeView.NodeGroup>
          ) : (
            <TreeView.Node className={styles.Node}>
              <TreeView.Cell className={styles.Cell}>
                <FileIcon />
                {nodeState.renaming ? (
                  <TreeView.NodeRenameInput className={styles.NodeRenameInput} />
                ) : (
                  <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
                )}
              </TreeView.Cell>
            </TreeView.Node>
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

const initialCollection = createTreeCollection<Node>({
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
