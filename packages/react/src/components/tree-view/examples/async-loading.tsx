import { TreeView, createTreeCollection, useTreeViewNodeContext } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon, LoaderIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/tree-view.module.css'

// mock api result
const response: Record<string, Node[]> = {
  node_modules: [
    { id: 'zag-js', name: 'zag-js' },
    { id: 'pandacss', name: 'panda' },
    { id: '@types', name: '@types', childrenCount: 2 },
  ],
  'node_modules/@types': [
    { id: 'react', name: 'react' },
    { id: 'react-dom', name: 'react-dom' },
  ],
  src: [
    { id: 'app.tsx', name: 'app.tsx' },
    { id: 'index.ts', name: 'index.ts' },
  ],
}

// function to load children of a node
function loadChildren(details: TreeView.LoadChildrenDetails<Node>): Promise<Node[]> {
  const value = details.valuePath.join('/')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response[value] ?? [])
    }, 500)
  })
}

export const AsyncLoading = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <TreeView.Root
      className={styles.Root}
      collection={collection}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e) => setCollection(e.collection)}
    >
      <TreeView.Label className={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree className={styles.Tree}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

function TreeBranchIcon() {
  const nodeState = useTreeViewNodeContext()
  if (nodeState.loading) return <LoaderIcon className={styles.Loader} />
  return nodeState.expanded ? <FolderOpenIcon /> : <FolderIcon />
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children || node.childrenCount ? (
        <TreeView.Branch className={styles.Branch}>
          <TreeView.BranchControl className={styles.BranchControl}>
            <TreeView.BranchIndicator className={styles.BranchIndicator}>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
            <TreeView.BranchText className={styles.BranchText}>
              <TreeBranchIcon /> {node.name}
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent className={styles.BranchContent}>
            <TreeView.BranchIndentGuide className={styles.BranchIndentGuide} />
            {node.children?.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item className={styles.Item}>
          <TreeView.ItemText className={styles.ItemText}>
            <FileIcon />
            {node.name}
          </TreeView.ItemText>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[]
  childrenCount?: number
}

const initialCollection = createTreeCollection<Node>({
  nodeToValue: (node) => node.id,
  nodeToString: (node) => node.name,
  rootNode: {
    id: 'ROOT',
    name: '',
    children: [
      { id: 'node_modules', name: 'node_modules', childrenCount: 3 },
      { id: 'src', name: 'src', childrenCount: 2 },
      { id: 'panda.config', name: 'panda.config.ts' },
      { id: 'package.json', name: 'package.json' },
      { id: 'renovate.json', name: 'renovate.json' },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})
