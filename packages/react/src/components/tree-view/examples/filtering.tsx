import { useFilter } from '@ark-ui/react/locale'
import { TreeView, createTreeCollection, useTreeViewContext } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/tree-view.module.css'
import fieldStyles from 'styles/field.module.css'

export const Filtering = () => {
  const { contains } = useFilter({ sensitivity: 'base' })
  const [collection, setCollection] = useState(initialCollection)

  const filter = (value: string) => {
    const filtered =
      value.length > 0 ? initialCollection.filter((node) => contains(node.name, value)) : initialCollection
    setCollection(filtered)
  }

  return (
    <div className="stack" style={{ maxWidth: '20rem' }}>
      <input className={fieldStyles.Input} placeholder="Search" onChange={(e) => filter(e.target.value)} />
      <TreeView.Root className={styles.Root} collection={collection}>
        <TreeView.Tree className={styles.Tree}>
          {collection.rootNode.children?.map((node, index) => (
            <TreeNode key={node.id} node={node} indexPath={[index]} />
          ))}
        </TreeView.Tree>
      </TreeView.Root>
    </div>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  const tree = useTreeViewContext()
  const nodeState = tree.getNodeState(props)
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {nodeState.isBranch ? (
        <TreeView.NodeGroup className={styles.NodeGroup}>
          <TreeView.Node className={styles.Node}>
            <TreeView.Cell className={styles.Cell}>
              <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText className={styles.NodeText}>
                {nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />} {node.name}
              </TreeView.NodeText>
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
            <TreeView.NodeText className={styles.NodeText}>
              <FileIcon />
              {node.name}
            </TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
      )}
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
