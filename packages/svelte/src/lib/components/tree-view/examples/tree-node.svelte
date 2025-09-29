<script lang="ts">
  import { TreeView } from '@ark-ui/svelte/tree-view'
  import { SquareCheckBigIcon, ChevronRight, File, Folder } from 'lucide-svelte'
  import TreeNode from './tree-node.svelte'

  interface Node {
    id: string
    name: string
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
        <TreeView.BranchText>
          <Folder />
          {node.name}
        </TreeView.BranchText>
        <TreeView.BranchIndicator>
          <ChevronRight />
        </TreeView.BranchIndicator>
      </TreeView.BranchControl>
      <TreeView.BranchContent>
        <TreeView.BranchIndentGuide />
        {#each node.children as child, index (child.id)}
          <TreeNode node={child} indexPath={[...indexPath, index]} />
        {/each}
      </TreeView.BranchContent>
    </TreeView.Branch>
  {:else}
    <TreeView.Item>
      <TreeView.ItemIndicator>
        <SquareCheckBigIcon />
      </TreeView.ItemIndicator>
      <TreeView.ItemText>
        <File />
        {node.name}
      </TreeView.ItemText>
    </TreeView.Item>
  {/if}
</TreeView.NodeProvider>
