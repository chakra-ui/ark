<script lang="ts">
  import { TreeView, createTreeCollection } from '../index.js'
  import { SquareCheckBigIcon, ChevronRightIcon, SquareMinusIcon, SquareIcon } from 'lucide-svelte'

  interface Node {
    id: string
    name: string
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
        { id: 'renovate.json', name: 'renovate.json' },
        { id: 'readme.md', name: 'README.md' },
      ],
    },
  })
</script>

<TreeView.Root {collection} defaultCheckedValue={[]}>
  <TreeView.Label>Tree</TreeView.Label>
  <TreeView.Tree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render TreeNode({ node, indexPath: [index] })}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet TreeNodeCheckbox()}
  <TreeView.NodeCheckbox>
    <TreeView.NodeCheckboxIndicator>
      {#snippet indeterminate()}
        <SquareMinusIcon />
      {/snippet}
      {#snippet fallback()}
        <SquareIcon />
      {/snippet}
      <SquareCheckBigIcon />
    </TreeView.NodeCheckboxIndicator>
  </TreeView.NodeCheckbox>
{/snippet}

{#snippet TreeNode({ node, indexPath }: TreeView.NodeProviderProps<Node>)}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.Branch>
        <TreeView.BranchControl>
          {@render TreeNodeCheckbox()}
          <TreeView.BranchText>{node.name}</TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {#each node.children as child, index (child.id)}
            {@render TreeNode({ node: child, indexPath: [...indexPath, index] })}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item>
        {@render TreeNodeCheckbox()}
        <TreeView.ItemText>{node.name}</TreeView.ItemText>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
