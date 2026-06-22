import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, ExternalLinkIcon, FileIcon } from 'lucide-solid'
import { For, Show } from 'solid-js'
import styles from 'styles/tree-view.module.css'

export const Links = () => {
  return (
    <TreeView.Root class={styles.Root} collection={collection}>
      <TreeView.Label class={styles.Label}>Docs</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection.rootNode.children}>{(node, index) => <TreeNode node={node} indexPath={[index()]} />}</For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <Show
        when={props.node.children}
        fallback={
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell
              class={styles.Cell}
              asChild={(cellProps) => (
                <a href={props.node.href} {...cellProps()}>
                  <TreeView.NodeText class={styles.NodeText}>
                    <FileIcon />
                    {props.node.name}
                  </TreeView.NodeText>
                  <Show when={props.node.href?.startsWith('http')}>
                    <ExternalLinkIcon size={12} />
                  </Show>
                </a>
              )}
            />
          </TreeView.Node>
        }
      >
        <TreeView.NodeGroup class={styles.NodeGroup}>
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell class={styles.Cell}>
              <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
            <TreeView.IndentGuide class={styles.IndentGuide} />
            <For each={props.node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
            </For>
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
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
