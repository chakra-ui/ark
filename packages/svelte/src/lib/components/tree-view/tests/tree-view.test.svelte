<script lang="ts">
  import { TreeView, createTreeCollection } from '../index.ts'

  interface Node {
    id: string
    name: string
    disabled?: boolean
    children?: Node[]
  }

  const props: Omit<TreeView.RootProps<Node>, 'collection'> = $props()

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
</script>

<TreeView.Root {collection} {...props}>
  <TreeView.Label>Tree</TreeView.Label>
  <TreeView.Tree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet renderNode(node: Node, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
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
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index])}
          {/each}
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    {:else}
      <TreeView.Node>
        <TreeView.Cell>
          <TreeView.NodeText>{node.name}</TreeView.NodeText>
        </TreeView.Cell>
      </TreeView.Node>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
