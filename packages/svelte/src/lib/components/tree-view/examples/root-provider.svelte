<script lang="ts">
  import { TreeView, createTreeCollection, useTreeView } from '$lib'
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte'
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
        { id: 'package.json', name: 'package.json' },
      ],
    },
  })

  const id = $props.id()
  const treeView = useTreeView({ collection, id })
</script>

<TreeView.RootProvider class={styles.Root} value={treeView}>
  <TreeView.Label class={styles.Label}>Root Provider Tree</TreeView.Label>
  <TreeView.Tree class={styles.Tree}>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.RootProvider>

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
