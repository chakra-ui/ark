<script lang="ts">
  import { TreeView } from '@ark-ui/svelte/tree-view'
  import { ChevronRight, ExternalLink, File } from 'lucide-svelte'
  import LinksTreeNode from './links-tree-node.svelte'

  interface Node {
    id: string
    name: string
    href?: string
    children?: Node[]
  }

  interface Props {
    node: Node
    indexPath: number[]
  }

  let { node, indexPath }: Props = $props()
</script>

<TreeView.NodeProvider {node} {indexPath}>
  {#if node.children}
    <TreeView.Branch>
      <TreeView.BranchControl>
        <TreeView.BranchText>{node.name}</TreeView.BranchText>
        <TreeView.BranchIndicator>
          <ChevronRight />
        </TreeView.BranchIndicator>
      </TreeView.BranchControl>
      <TreeView.BranchContent>
        <TreeView.BranchIndentGuide />
        {#each node.children as child, index (child.id)}
          <LinksTreeNode node={child} indexPath={[...indexPath, index]} />
        {/each}
      </TreeView.BranchContent>
    </TreeView.Branch>
  {:else}
    <TreeView.Item>
      {#snippet asChild(itemProps)}
        <a href={node.href} {...itemProps()}>
          <TreeView.ItemText>
            <File />
            {node.name}
          </TreeView.ItemText>
          {#if node.href?.startsWith('http')}
            <ExternalLink size={12} />
          {/if}
        </a>
      {/snippet}
    </TreeView.Item>
  {/if}
</TreeView.NodeProvider>
