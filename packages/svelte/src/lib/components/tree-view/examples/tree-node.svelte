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
        <TreeView.Branch class={styles.Branch}>
          <TreeView.BranchControl class={styles.BranchControl}>
            <TreeView.BranchIndicator class={styles.BranchIndicator}>
              <ChevronRightIcon />
            </TreeView.BranchIndicator>
            <TreeView.BranchText class={styles.BranchText}>
              {#if nodeState().expanded}
                <FolderOpenIcon />
              {:else}
                <FolderIcon />
              {/if}
              {node.name}
            </TreeView.BranchText>
          </TreeView.BranchControl>
          <TreeView.BranchContent class={styles.BranchContent}>
            <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
            {#each node.children as child, index (child.id)}
              <TreeNode node={child} indexPath={[...indexPath, index]} />
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
