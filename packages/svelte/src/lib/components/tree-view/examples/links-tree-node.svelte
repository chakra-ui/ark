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
              <LinksTreeNode node={child} indexPath={[...indexPath, index]} />
            {/each}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      {:else}
        <TreeView.Node class={styles.Node}>
          <TreeView.Cell class={styles.Cell}>
            {#snippet asChild(itemProps)}
              <a href={node.href} {...itemProps()}>
                <TreeView.NodeText class={styles.NodeText}>
                  <FileIcon />
                  {node.name}
                </TreeView.NodeText>
                {#if node.href?.startsWith('http')}
                  <ExternalLinkIcon size={12} />
                {/if}
              </a>
            {/snippet}
          </TreeView.Cell>
        </TreeView.Node>
      {/if}
    {/snippet}
  </TreeView.NodeContext>
</TreeView.NodeProvider>
