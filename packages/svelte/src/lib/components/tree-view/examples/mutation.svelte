<script lang="ts">
  import { TreeView, createTreeCollection, type UseTreeViewContext } from '$lib'
  import { ChevronRightIcon, PlusIcon, TrashIcon } from 'lucide-svelte'
  import styles from 'styles/tree-view.module.css'

  interface TreeNode {
    id: string
    name: string
    children?: TreeNode[]
  }

  let collection = $state(
    createTreeCollection<TreeNode>({
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
    }),
  )

  function handleRemove(node: TreeNode, indexPath: number[]) {
    collection = collection.remove([indexPath])
  }

  function handleAdd(node: TreeNode, indexPath: number[], tree: UseTreeViewContext<TreeNode>) {
    if (!collection.isBranchNode(node)) return
    const children = [{ id: `untitled-${Date.now()}`, name: 'untitled.tsx' }, ...(node.children || [])]
    collection = collection.replace(indexPath, { ...node, children })
    tree().expand([node.id])
  }
</script>

<TreeView.Root class={styles.Root} {collection}>
  <TreeView.Context>
    {#snippet render(tree)}
      <TreeView.Tree class={styles.Tree}>
        {#each collection.rootNode.children ?? [] as node, index (node.id)}
          {@render renderNode(node, [index], tree)}
        {/each}
      </TreeView.Tree>
    {/snippet}
  </TreeView.Context>
</TreeView.Root>

{#snippet renderNode(node: TreeNode, indexPath: number[], tree: UseTreeViewContext)}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children}
      <TreeView.Branch class={styles.Branch}>
        <TreeView.BranchControl class={styles.BranchControl}>
          <TreeView.BranchIndicator class={styles.BranchIndicator}>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
          <TreeView.BranchText class={styles.BranchText}>{node.name}</TreeView.BranchText>
          <div class={styles.ActionGroup}>
            <button
              class={styles.Action}
              onclick={(e) => {
                e.stopPropagation()
                handleRemove(node, indexPath)
              }}
            >
              <TrashIcon />
            </button>
            <button
              class={styles.Action}
              onclick={(e) => {
                e.stopPropagation()
                handleAdd(node, indexPath, tree)
              }}
            >
              <PlusIcon />
            </button>
          </div>
        </TreeView.BranchControl>
        <TreeView.BranchContent class={styles.BranchContent}>
          <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index], tree)}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item class={styles.Item}>
        <TreeView.ItemText class={styles.ItemText}>{node.name}</TreeView.ItemText>
        <div class={styles.ActionGroup}>
          <button
            class={styles.Action}
            onclick={(e) => {
              e.stopPropagation()
              handleRemove(node, indexPath)
            }}
          >
            <TrashIcon />
          </button>
        </div>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
