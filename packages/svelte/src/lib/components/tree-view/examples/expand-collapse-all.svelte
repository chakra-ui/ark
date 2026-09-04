<script lang="ts">
  import { TreeView, createTreeCollection } from '$lib'
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
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

  const branchValues = collection.getBranchValues()
</script>

<TreeView.Root class={styles.Root} {collection} data-animate="false">
  <TreeView.Context>
    {#snippet render(tree)}
      <div class="hstack">
        {#if branchValues.every((value) => tree().expandedValue.includes(value))}
          <button class={button.Root} onclick={() => tree().collapse()}>Collapse all</button>
        {:else}
          <button class={button.Root} onclick={() => tree().expand()}>Expand all</button>
        {/if}
      </div>
    {/snippet}
  </TreeView.Context>
  <TreeView.Tree class={styles.Tree}>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet renderNode(node: TreeNode, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    <TreeView.NodeContext>
      {#snippet render(nodeState)}
        {#if node.children}
          <TreeView.NodeGroup class={styles.NodeGroup}>
            <TreeView.Node class={styles.Node}>
              <TreeView.Cell class={styles.Cell}>
                <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                  <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                    <ChevronRightIcon />
                  </TreeView.NodeIndicator>
                </TreeView.NodeExpandTrigger>
                <TreeView.NodeText class={styles.NodeText}>
                  {#if nodeState().expanded}
                    <FolderOpenIcon />
                  {:else}
                    <FolderIcon />
                  {/if}
                  {node.name}
                </TreeView.NodeText>
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
              <TreeView.NodeText class={styles.NodeText}>
                <FileIcon />
                {node.name}
              </TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
        {/if}
      {/snippet}
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
{/snippet}
