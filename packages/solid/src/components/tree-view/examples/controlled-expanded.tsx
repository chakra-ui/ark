import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import styles from 'styles/tree-view.module.css'

export const ControlledExpanded = () => {
  const [expandedValue, setExpandedValue] = createSignal<string[]>(['node_modules'])

  return (
    <TreeView.Root
      class={styles.Root}
      collection={collection}
      expandedValue={expandedValue()}
      onExpandedChange={({ expandedValue }) => setExpandedValue(expandedValue)}
    >
      <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection.rootNode.children}>{(node, index) => <TreeNode node={node} indexPath={[index()]} />}</For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <TreeView.NodeContext>
        {(nodeState) =>
          props.node.children ? (
            <TreeView.Branch class={styles.Branch}>
              <TreeView.BranchControl class={styles.BranchControl}>
                <TreeView.BranchIndicator class={styles.BranchIndicator}>
                  <ChevronRightIcon />
                </TreeView.BranchIndicator>
                <TreeView.BranchText class={styles.BranchText}>
                  {nodeState().expanded ? <FolderOpenIcon /> : <FolderIcon />}
                  {props.node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent class={styles.BranchContent}>
                <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
                <For each={props.node.children}>
                  {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
                </For>
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item class={styles.Item}>
              <TreeView.ItemText class={styles.ItemText}>
                <FileIcon />
                {props.node.name}
              </TreeView.ItemText>
            </TreeView.Item>
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
