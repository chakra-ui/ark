import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, ExternalLinkIcon, FileIcon } from 'lucide-react'

export const Links = () => {
  return (
    <TreeView.Root collection={collection}>
      <TreeView.Label>Docs</TreeView.Label>
      <TreeView.Tree>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
            <TreeView.BranchIndicator>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
          </TreeView.BranchControl>
          <TreeView.BranchContent>
            <TreeView.BranchIndentGuide />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.BranchContent>
        </TreeView.Branch>
      ) : (
        <TreeView.Item asChild>
          <a href={node.href}>
            <TreeView.ItemText>
              <FileIcon />
              {node.name}
            </TreeView.ItemText>
            {node.href?.startsWith('http') && <ExternalLinkIcon size={12} />}
          </a>
        </TreeView.Item>
      )}
    </TreeView.NodeProvider>
  )
}

interface Node {
  id: string
  name: string
  href?: string
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
        id: 'docs',
        name: 'Documentation',
        children: [
          { id: 'docs/getting-started', name: 'Getting Started', href: '/docs/getting-started' },
          { id: 'docs/installation', name: 'Installation', href: '/docs/installation' },
          {
            id: 'docs/components',
            name: 'Components',
            children: [
              { id: 'docs/components/accordion', name: 'Accordion', href: '/docs/components/accordion' },
              { id: 'docs/components/dialog', name: 'Dialog', href: '/docs/components/dialog' },
              { id: 'docs/components/menu', name: 'Menu', href: '/docs/components/menu' },
            ],
          },
        ],
      },
      {
        id: 'examples',
        name: 'Examples',
        children: [
          { id: 'examples/react', name: 'React Examples', href: '/examples/react' },
          { id: 'examples/vue', name: 'Vue Examples', href: '/examples/vue' },
          { id: 'examples/solid', name: 'Solid Examples', href: '/examples/solid' },
        ],
      },
      {
        id: 'external',
        name: 'External Links',
        children: [
          { id: 'external/github', name: 'GitHub Repository', href: 'https://github.com/chakra-ui/zag' },
          { id: 'external/npm', name: 'NPM Package', href: 'https://www.npmjs.com/package/@zag-js/core' },
          { id: 'external/docs', name: 'Official Docs', href: 'https://zagjs.com' },
        ],
      },
      { id: 'readme.md', name: 'README.md', href: '/readme' },
      { id: 'license', name: 'LICENSE', href: '/license' },
    ],
  },
})
