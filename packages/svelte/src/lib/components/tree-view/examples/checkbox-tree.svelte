<script lang="ts">
  import { TreeView, createTreeCollection } from '$lib'
  import { SquareCheckBigIcon, ChevronRightIcon, SquareMinusIcon, SquareIcon } from 'lucide-svelte'
  import styles from 'styles/tree-view.module.css'

  interface TreeNode {
    id: string
    name: string
    children?: TreeNode[]
  }

  const collection = createTreeCollection<TreeNode>({
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

<TreeView.Root class={styles.Root} {collection} defaultCheckedValue={[]}>
  <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
  <TreeView.Tree class={styles.Tree}>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet treeNodeCheckbox()}
  <TreeView.NodeCheckbox class={styles.NodeCheckbox}>
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

{#snippet renderNode(node: TreeNode, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.Branch class={styles.Branch}>
        <TreeView.BranchControl class={styles.BranchControl}>
          {@render treeNodeCheckbox()}
          <TreeView.BranchText class={styles.BranchText}>{node.name}</TreeView.BranchText>
          <TreeView.BranchIndicator class={styles.BranchIndicator}>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent class={styles.BranchContent}>
          <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index])}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item class={styles.Item}>
        {@render treeNodeCheckbox()}
        <TreeView.ItemText class={styles.ItemText}>{node.name}</TreeView.ItemText>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
