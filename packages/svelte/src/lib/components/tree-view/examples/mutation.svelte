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

{#snippet renderNode(node: TreeNode, indexPath: number[], tree: any)}
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
            <TreeView.NodeText class={styles.NodeText}>{node.name}</TreeView.NodeText>
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
          </TreeView.Cell>
        </TreeView.Node>
        <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
          <TreeView.IndentGuide class={styles.IndentGuide} />
          {#each node.children as child, index (child.id)}
            {@render renderNode(child, [...indexPath, index], tree)}
          {/each}
        </TreeView.NodeGroupContent>
      </TreeView.NodeGroup>
    {:else}
      <TreeView.Node class={styles.Node}>
        <TreeView.Cell class={styles.Cell}>
          <TreeView.NodeText class={styles.NodeText}>{node.name}</TreeView.NodeText>
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
        </TreeView.Cell>
      </TreeView.Node>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
