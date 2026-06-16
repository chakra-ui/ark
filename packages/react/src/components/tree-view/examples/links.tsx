import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { ChevronRightIcon, ExternalLinkIcon, FileIcon } from 'lucide-react'
import styles from 'styles/tree-view.module.css'

export const Links = () => {
  return (
    <TreeView.Root className={styles.Root} collection={collection}>
      <TreeView.Label className={styles.Label}>Docs</TreeView.Label>
      <TreeView.Tree className={styles.Tree}>
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
        <TreeView.NodeGroup className={styles.NodeGroup}>
          <TreeView.Node className={styles.Node}>
            <TreeView.Cell className={styles.Cell}>
              <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent className={styles.NodeGroupContent}>
            <TreeView.IndentGuide className={styles.IndentGuide} />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node className={styles.Node}>
          <TreeView.Cell className={styles.Cell} asChild>
            <a href={node.href}>
              <TreeView.NodeText className={styles.NodeText}>
                <FileIcon />
                {node.name}
              </TreeView.NodeText>
              {node.href?.startsWith('http') && <ExternalLinkIcon size={12} />}
            </a>
          </TreeView.Cell>
        </TreeView.Node>
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
