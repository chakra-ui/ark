import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/react/tree-view'
import { CheckSquareIcon, ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'

interface Node {
  id: string
  name: string
  children?: Node[]
}

export const RootProvider = () => {
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

  const treeView = useTreeView({ collection: collection })
  const renderNode = (node: Node, indexPath: number[]) => (
    <TreeView.TreeNodeProvider key={node.id} node={node} indexPath={indexPath}>
      <TreeView.TreeNode type="branch">
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
            {node.children?.map((child, index) => renderNode(child, [...indexPath, index]))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      </TreeView.TreeNode>
      <TreeView.TreeNode type="item">
        <TreeView.Item>
          <TreeView.ItemIndicator>
            <CheckSquareIcon />
          </TreeView.ItemIndicator>
          <TreeView.ItemText>
            <FileIcon />
            {node.name}
          </TreeView.ItemText>
        </TreeView.Item>
      </TreeView.TreeNode>
    </TreeView.TreeNodeProvider>
  )

  return (
    <TreeView.RootProvider value={treeView}>
      <TreeView.Label>Tree</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => renderNode(node, [index]))}
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}
