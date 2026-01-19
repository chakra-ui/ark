<script lang="ts">
  import { TreeView, createTreeCollection } from '$lib'
  import { ChevronRightIcon, FileIcon, FolderIcon, LoaderCircleIcon } from 'lucide-svelte'
  import styles from 'styles/tree-view.module.css'

  interface TreeNode {
    id: string
    name: string
    children?: TreeNode[]
    childrenCount?: number
  }

  const response: Record<string, TreeNode[]> = {
    node_modules: [
      { id: 'zag-js', name: 'zag-js' },
      { id: 'pandacss', name: 'panda' },
      { id: '@types', name: '@types', childrenCount: 2 },
    ],
    'node_modules/@types': [
      { id: 'react', name: 'react' },
      { id: 'react-dom', name: 'react-dom' },
    ],
    src: [
      { id: 'app.tsx', name: 'app.tsx' },
      { id: 'index.ts', name: 'index.ts' },
    ],
  }

  function loadChildren(details: TreeView.LoadChildrenDetails<TreeNode>): Promise<TreeNode[]> {
    const value = details.valuePath.join('/')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response[value] ?? [])
      }, 1200)
    })
  }

  const initialCollection = createTreeCollection<TreeNode>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        { id: 'node_modules', name: 'node_modules', childrenCount: 3 },
        { id: 'src', name: 'src', childrenCount: 2 },
        { id: 'panda.config', name: 'panda.config.ts' },
        { id: 'package.json', name: 'package.json' },
        { id: 'renovate.json', name: 'renovate.json' },
        { id: 'readme.md', name: 'README.md' },
      ],
    },
  })

  let collection = $state(initialCollection)
</script>

<TreeView.Root
  class={styles.Root}
  {collection}
  {loadChildren}
  onLoadChildrenComplete={(e) => (collection = e.collection)}
>
  <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
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
        {#if node.children || node.childrenCount}
          <TreeView.Branch class={styles.Branch}>
            <TreeView.BranchControl class={styles.BranchControl}>
              <TreeView.BranchIndicator class={styles.BranchIndicator}>
                <ChevronRightIcon />
              </TreeView.BranchIndicator>
              <TreeView.BranchText class={styles.BranchText}>
                {#if nodeState().loading}
                  <LoaderCircleIcon style="animation: spin 1s infinite" />
                {:else}
                  <FolderIcon />
                {/if}
                {node.name}
              </TreeView.BranchText>
            </TreeView.BranchControl>
            <TreeView.BranchContent class={styles.BranchContent}>
              <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
              {#each node.children ?? [] as child, index (child.id)}
                {@render renderNode(child, [...indexPath, index])}
              {/each}
            </TreeView.BranchContent>
          </TreeView.Branch>
        {:else}
          <TreeView.Item class={styles.Item}>
            <TreeView.ItemText class={styles.ItemText}>
              <FileIcon />
              {node.name}
            </TreeView.ItemText>
          </TreeView.Item>
        {/if}
      {/snippet}
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
{/snippet}
