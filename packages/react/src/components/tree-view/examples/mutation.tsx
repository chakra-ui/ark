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
        <TreeView.NodeGroup className={styles.NodeGroup}>
          <TreeView.Node className={styles.Node}>
            <TreeView.Cell className={styles.Cell}>
              <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
              <TreeNodeActions {...props} />
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent className={styles.NodeGroupContent}>
            <TreeView.IndentGuide className={styles.IndentGuide} />
            {node.children?.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                indexPath={[...indexPath, index]}
                onRemove={props.onRemove}
                onAdd={props.onAdd}
              />
            ))}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node className={styles.Node}>
          <TreeView.Cell className={styles.Cell}>
            <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
            <TreeNodeActions {...props} />
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
