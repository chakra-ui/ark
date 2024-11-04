import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/solid/tree-view'
import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-solid'
import { For, Show } from 'solid-js'

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

export const RootProvider = () => {
  const treeView = useTreeView({ collection })

  return (
    <TreeView.RootProvider value={treeView}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} />}
        </For>
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <Show
        when={node.children}
        fallback={
          <TreeView.Item>
            <TreeView.ItemIndicator>
              <CheckSquareIcon />
            </TreeView.ItemIndicator>
            <TreeView.ItemText>
              <FileIcon />
              {node.name}
            </TreeView.ItemText>
          </TreeView.Item>
        }
      >
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>
              <FolderIcon /> {node.name}
            </TreeView.BranchText>
            <TreeView.BranchIndicator>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            <For each={node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...indexPath, index()]} />}
            </For>
          </TreeView.BranchContent>
        </TreeView.Branch>
      </Show>
    </TreeView.NodeProvider>
  )
}
