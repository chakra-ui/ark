<script lang="ts">
  import { TreeView } from '$lib'
  import { ChevronRightIcon, ExternalLinkIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte'
  import LinksTreeNode from './links-tree-node.svelte'
  import styles from 'styles/tree-view.module.css'

  interface TreeNode {
    id: string
    name: string
    href?: string
    children?: TreeNode[]
  }

  interface Props {
    node: TreeNode
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
              <LinksTreeNode node={child} indexPath={[...indexPath, index]} />
            {/each}
          </TreeView.BranchContent>
        </TreeView.Branch>
      {:else}
        <TreeView.Item class={styles.Item}>
          {#snippet asChild(itemProps)}
            <a href={node.href} {...itemProps()}>
              <TreeView.ItemText class={styles.ItemText}>
                <FileIcon />
                {node.name}
              </TreeView.ItemText>
              {#if node.href?.startsWith('http')}
                <ExternalLinkIcon size={12} />
              {/if}
            </a>
          {/snippet}
        </TreeView.Item>
      {/if}
    {/snippet}
  </TreeView.NodeContext>
</TreeView.NodeProvider>
