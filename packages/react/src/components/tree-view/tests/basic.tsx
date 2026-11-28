import type { Optional } from '@ark-ui/react'
import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'

interface Node {
  id: string
  name: string
  disabled?: boolean | undefined
  children?: Node[] | undefined
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
      { id: 'renovate.json', name: 'renovate.json', disabled: true },
      { id: 'readme.md', name: 'README.md' },
    ],
  },
})

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.NodeGroup>
          <TreeView.Node>
            <TreeView.Cell>
              <TreeView.NodeExpandTrigger>
                <TreeView.NodeIndicator type="expanded">›</TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText>{node.name}</TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent>
            <TreeView.IndentGuide />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node>
          <TreeView.Cell>
            <TreeView.NodeText>{node.name}</TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
      )}
    </TreeView.NodeProvider>
  )
}

export const ComponentUnderTest = (props: Optional<TreeView.RootProps<Node>, 'collection'>) => (
  <TreeView.Root collection={collection} {...props}>
    <TreeView.Label>Tree</TreeView.Label>
    <TreeView.Tree>
      {collection.rootNode.children?.map((node, index) => (
        <TreeNode key={node.id} node={node} indexPath={[index]} />
      ))}
    </TreeView.Tree>
  </TreeView.Root>
)
