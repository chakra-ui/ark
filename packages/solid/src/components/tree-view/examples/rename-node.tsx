import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-solid'
import { For, Show, createSignal } from 'solid-js'
import styles from 'styles/tree-view.module.css'

export const RenameNode = () => {
  const [collection, setCollection] = createSignal(initialCollection)
  return (
    <TreeView.Root
      class={styles.Root}
      collection={collection()}
      canRename={() => true}
      onRenameComplete={(details) => {
        setCollection((prev) => {
          const node = prev.at(details.indexPath)
          if (!node) return prev
          return prev.replace(details.indexPath, { ...node, name: details.label })
        })
      }}
    >
      <TreeView.Label class={styles.Label}>Tree (Press F2 to rename)</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection().rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <TreeView.NodeContext>
        {(nodeState) => (
          <Show
            when={props.node.children}
            fallback={
              <TreeView.Item class={styles.Item}>
                <FileIcon />
                <Show
                  when={nodeState().renaming}
                  fallback={<TreeView.ItemText class={styles.ItemText}>{props.node.name}</TreeView.ItemText>}
                >
                  <TreeView.NodeRenameInput class={styles.NodeRenameInput} />
                </Show>
              </TreeView.Item>
            }
          >
            <TreeView.Branch class={styles.Branch}>
              <TreeView.BranchControl class={styles.BranchControl}>
                <TreeView.BranchIndicator class={styles.BranchIndicator}>
                  <ChevronRightIcon />
                </TreeView.BranchIndicator>
                <Show
                  when={nodeState().renaming}
                  fallback={
                    <TreeView.BranchText class={styles.BranchText}>
                      <Show when={nodeState().expanded} fallback={<FolderIcon />}>
                        <FolderOpenIcon />
                      </Show>
                      {props.node.name}
                    </TreeView.BranchText>
                  }
                >
                  <TreeView.NodeRenameInput class={styles.NodeRenameInput} />
                </Show>
              </TreeView.BranchControl>
              <TreeView.BranchContent class={styles.BranchContent}>
                <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
                <For each={props.node.children}>
                  {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
                </For>
              </TreeView.BranchContent>
            </TreeView.Branch>
          </Show>
        )}
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
