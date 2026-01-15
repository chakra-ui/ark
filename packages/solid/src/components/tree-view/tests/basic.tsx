import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-solid'
import { For } from 'solid-js'
import { TreeView, createTreeCollection } from '../'

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

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <TreeView.NodeContext>
        {(nodeState) =>
          props.node.children ? (
            <TreeView.Branch>
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <ChevronRightIcon />
                </TreeView.BranchIndicator>
                <TreeView.BranchText>
                  {nodeState().expanded ? <FolderOpenIcon /> : <FolderIcon />}
                  {props.node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.BranchIndentGuide />
                <For each={props.node.children}>
                  {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
                </For>
              </TreeView.BranchContent>
            </TreeView.Branch>
          ) : (
            <TreeView.Item>
              <TreeView.ItemText>
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

export const ComponentUnderTest = (props: Omit<TreeView.RootProps<Node>, 'collection'>) => {
  return (
    <TreeView.Root collection={collection} {...props}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children}>{(node, index) => <TreeNode node={node} indexPath={[index()]} />}</For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}
