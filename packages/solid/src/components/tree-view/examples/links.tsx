import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, ExternalLinkIcon, FileIcon } from 'lucide-solid'
import { For, Show } from 'solid-js'

export const Links = () => {
  return (
    <TreeView.Root collection={collection}>
      <TreeView.Label>Docs</TreeView.Label>
      <TreeView.Tree>
        <For each={collection.rootNode.children}>{(node, index) => <TreeNode node={node} indexPath={[index()]} />}</For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider node={node} indexPath={indexPath}>
      <Show
        when={node.children}
        fallback={
          <TreeView.Item asChild={(props) => <a href={node.href} {...props()} />}>
            <TreeView.ItemText>
              <FileIcon />
              {node.name}
            </TreeView.ItemText>
            <Show when={node.href?.startsWith('http')}>
              <ExternalLinkIcon size={12} />
            </Show>
          </TreeView.Item>
        }
      >
        <TreeView.Branch>
          <TreeView.BranchControl>
            <TreeView.BranchText>{node.name}</TreeView.BranchText>
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
