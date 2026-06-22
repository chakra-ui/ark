import { TreeView, createTreeCollection, useTreeViewNodeContext } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon, LoaderIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
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
  const [collection, setCollection] = createSignal(initialCollection)
  return (
    <TreeView.Root
      class={styles.Root}
      collection={collection()}
      loadChildren={loadChildren}
      onLoadChildrenComplete={(e) => setCollection(e.collection)}
    >
      <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection().rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

function TreeBranchIcon() {
  const nodeState = useTreeViewNodeContext()
  return nodeState().loading ? (
    <LoaderIcon class={styles.Loader} />
  ) : nodeState().expanded ? (
    <FolderOpenIcon />
  ) : (
    <FolderIcon />
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      {props.node.children || props.node.childrenCount ? (
        <TreeView.NodeGroup class={styles.NodeGroup}>
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell class={styles.Cell}>
              <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText class={styles.NodeText}>
                <TreeBranchIcon /> {props.node.name}
              </TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
            <TreeView.IndentGuide class={styles.IndentGuide} />
            <For each={props.node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
            </For>
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node class={styles.Node}>
          <TreeView.Cell class={styles.Cell}>
            <TreeView.NodeText class={styles.NodeText}>
              <FileIcon />
              {props.node.name}
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
