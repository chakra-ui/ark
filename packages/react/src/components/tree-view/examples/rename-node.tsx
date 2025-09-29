import { Editable } from '@ark-ui/react/editable'
import { type TreeCollection, TreeView, createTreeCollection, useTreeViewContext } from '@ark-ui/react/tree-view'
import { SquareCheckBigIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'
import { useState } from 'react'

export const RenameNode = () => {
  const [collection, setCollection] = useState(initialCollection)
  return (
    <TreeView.Root collection={collection}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} onRename={setCollection} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

interface TreeNodeHandlers {
  onRename: (collection: TreeCollection<Node>) => void
}

interface TreeLabelProps extends TreeNodeHandlers {
  defaultValue: string
  indexPath: number[]
}

const TreeLabel = (props: TreeLabelProps) => {
  const tree = useTreeViewContext()
  const { defaultValue, indexPath, onRename } = props
  return (
    <Editable.Root
      style={{ display: 'contents' }}
      activationMode="dblclick"
      defaultValue={defaultValue}
      onValueCommit={(details) => {
        const node = tree.collection.at(indexPath)
        const collection = tree.collection.replace(indexPath, { ...node, name: details.value })
        onRename(collection)
      }}
    >
      <Editable.Input />
      <Editable.Preview />
    </Editable.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node> & TreeNodeHandlers) => {
  const { node, indexPath, onRename } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>
              <FolderIcon />
              <TreeLabel defaultValue={node.name} indexPath={indexPath} onRename={onRename} />
            </TreeView.BranchText>
            <TreeView.BranchIndicator>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} onRename={onRename} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item>
          <TreeView.ItemIndicator>
            <SquareCheckBigIcon />
          </TreeView.ItemIndicator>
          <TreeView.ItemText>
            <FileIcon />
            <TreeLabel defaultValue={node.name} indexPath={indexPath} onRename={onRename} />
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
