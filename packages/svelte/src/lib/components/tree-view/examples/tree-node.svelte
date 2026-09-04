<script lang="ts">
  import { TreeView } from '$lib'
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte'
  import TreeNode from './tree-node.svelte'
  import styles from 'styles/tree-view.module.css'

  interface TreeNodeData {
    id: string
    name: string
    children?: TreeNodeData[]
  }

  interface Props {
    node: TreeNodeData
    indexPath: number[]
  }

  let { node, indexPath }: Props = $props()
</script>

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
              <TreeNode node={child} indexPath={[...indexPath, index]} />
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
