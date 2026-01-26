import { TreeView, createTreeCollection, useTreeViewContext } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import styles from 'styles/tree-view.module.css'

export const Mutation = () => {
  const [collection, setCollection] = useState(initialCollection)

  const removeNode = (props: TreeNodeProps) => {
    setCollection(collection.remove([props.indexPath]))
  }

  const addNode = (props: TreeNodeProps) => {
    const { node, indexPath } = props
    if (!collection.isBranchNode(node)) return
    const children = [{ id: `untitled-${Date.now()}`, name: 'untitled.tsx' }, ...(node.children || [])]
    setCollection(collection.replace(indexPath, { ...node, children }))
  }

  return (
    <TreeView.Root className={styles.Root} collection={collection}>
      <TreeView.Tree className={styles.Tree}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} onRemove={removeNode} onAdd={addNode} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNodeActions = (props: TreeNodeProps) => {
  const { onRemove, onAdd, node } = props
  const tree = useTreeViewContext()
  const isBranch = tree.collection.isBranchNode(node)
  return (
    <div className={styles.ActionGroup}>
      <button
        className={styles.Action}
        onClick={(e) => {
          e.stopPropagation()
          onRemove?.(props)
        }}
      >
        <TrashIcon />
      </button>
      {isBranch && (
        <button
          className={styles.Action}
          onClick={(e) => {
            e.stopPropagation()
            onAdd?.(props)
            tree.expand([node.id])
          }}
        >
          <PlusIcon />
        </button>
      )}
    </div>
  )
}

interface TreeNodeProps extends TreeView.NodeProviderProps<Node> {
  onRemove?: (props: TreeView.NodeProviderProps<Node>) => void
  onAdd?: (props: TreeView.NodeProviderProps<Node>) => void
}

const TreeNode = (props: TreeNodeProps) => {
  const { node, indexPath } = props
  const tree = useTreeViewContext()
  const nodeState = tree.getNodeState(props)
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {nodeState.isBranch ? (
        <TreeView.Branch className={styles.Branch}>
          <TreeView.BranchControl className={styles.BranchControl}>
            <TreeView.BranchIndicator className={styles.BranchIndicator}>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
            <TreeView.BranchText className={styles.BranchText}>{node.name}</TreeView.BranchText>
            <TreeNodeActions {...props} />
          </TreeView.BranchControl>
          <TreeView.BranchContent className={styles.BranchContent}>
            <TreeView.BranchIndentGuide className={styles.BranchIndentGuide} />
            {node.children?.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
                onRemove={props.onRemove}
                onAdd={props.onAdd}
              />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item className={styles.Item}>
          <TreeView.ItemText className={styles.ItemText}>{node.name}</TreeView.ItemText>
          <TreeNodeActions {...props} />
        </TreeView.Item>
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
