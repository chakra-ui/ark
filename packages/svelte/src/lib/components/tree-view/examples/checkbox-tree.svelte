<script lang="ts">
  import { TreeView, createTreeCollection } from '$lib'
  import { CheckIcon, ChevronRightIcon, MinusIcon } from 'lucide-svelte'
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

{#snippet nodeCheckbox()}
  <TreeView.NodeCheckbox class={styles.NodeCheckbox}>
    <TreeView.NodeIndicator type="checked" class={styles.NodeIndicator}>
      <CheckIcon />
    </TreeView.NodeIndicator>
    <TreeView.NodeIndicator type="indeterminate" class={styles.NodeIndicator}>
      <MinusIcon />
    </TreeView.NodeIndicator>
  </TreeView.NodeCheckbox>
{/snippet}

{#snippet renderNode(node: TreeNode, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.NodeGroup class={styles.NodeGroup}>
        <TreeView.Node class={styles.Node}>
          <TreeView.Cell class={styles.Cell}>
            <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
              <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                <ChevronRightIcon />
              </TreeView.NodeIndicator>
            </TreeView.NodeExpandTrigger>
            {@render nodeCheckbox()}
            <TreeView.NodeText class={styles.NodeText}>{node.name}</TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
          <TreeView.IndentGuide class={styles.IndentGuide} />
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index])}
          {/each}
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    {:else}
      <TreeView.Node class={styles.Node}>
        <TreeView.Cell class={styles.Cell}>
          {@render nodeCheckbox()}
          <TreeView.NodeText class={styles.NodeText}>{node.name}</TreeView.NodeText>
        </TreeView.Cell>
      </TreeView.Node>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
