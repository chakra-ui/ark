import { TreeView, createTreeCollection, useTreeViewContext } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, PlusIcon, TrashIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import styles from 'styles/tree-view.module.css'

export const Mutation = () => {
  const [collection, setCollection] = createSignal(initialCollection)

  const removeNode = (props: TreeNodeProps) => {
    setCollection((prev) => prev.remove([props.indexPath]))
  }

  const addNode = (props: TreeNodeProps) => {
    const { node, indexPath } = props
    const col = collection()
    if (!col.isBranchNode(node)) return
    const children = [{ id: `untitled-${Date.now()}`, name: 'untitled.tsx' }, ...(node.children || [])]
    setCollection(col.replace(indexPath, { ...node, children }))
  }

  return (
    <TreeView.Root class={styles.Root} collection={collection()}>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection().rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} onRemove={removeNode} onAdd={addNode} />}
        </For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNodeActions = (props: TreeNodeProps) => {
  const tree = useTreeViewContext()
  const isBranch = () => tree().collection.isBranchNode(props.node)
  return (
    <div class={styles.ActionGroup}>
      <button
        class={styles.Action}
        onClick={(e) => {
          e.stopPropagation()
          props.onRemove?.(props)
        }}
      >
        <TrashIcon />
      </button>
      <Show when={isBranch()}>
        <button
          class={styles.Action}
          onClick={(e) => {
            e.stopPropagation()
            props.onAdd?.(props)
            tree().expand([props.node.id])
          }}
        >
          <PlusIcon />
        </button>
      </Show>
    </div>
  )
}

interface TreeNodeProps extends TreeView.NodeProviderProps<Node> {
  onRemove?: (props: TreeView.NodeProviderProps<Node>) => void
  onAdd?: (props: TreeView.NodeProviderProps<Node>) => void
}

const TreeNode = (props: TreeNodeProps) => {
  const tree = useTreeViewContext()
  const nodeState = () => tree().getNodeState(props)
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <Show
        when={nodeState().isBranch}
        fallback={
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell class={styles.Cell}>
              <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
              <TreeNodeActions {...props} />
            </TreeView.Cell>
          </TreeView.Node>
        }
      >
        <TreeView.NodeGroup class={styles.NodeGroup}>
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell class={styles.Cell}>
              <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
              <TreeNodeActions {...props} />
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
            <TreeView.IndentGuide class={styles.IndentGuide} />
            <For each={props.node.children}>
              {(child, index) => (
                <TreeNode
                  node={child}
                  indexPath={[...props.indexPath, index()]}
                  onRemove={props.onRemove}
                  onAdd={props.onAdd}
                />
              )}
            </For>
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      </Show>
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
