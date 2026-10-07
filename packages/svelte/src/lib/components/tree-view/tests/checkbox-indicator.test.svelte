<script lang="ts">
  import { TreeView, createTreeCollection } from '../index.ts'

  interface Node {
    id: string
    name: string
    children?: Node[]
  }

  const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        {
          id: 'src',
          name: 'src',
          children: [
            { id: 'src/a', name: 'a' },
            { id: 'src/b', name: 'b' },
          ],
        },
      ],
    },
  })

  const branch = collection.rootNode.children![0]
</script>

{#snippet nodeCheckbox(id: string)}
  <TreeView.NodeCheckbox data-testid={`checkbox-${id}`}>
    <TreeView.NodeCheckboxIndicator>
      checked
      {#snippet indeterminate()}partial{/snippet}
      {#snippet fallback()}empty{/snippet}
    </TreeView.NodeCheckboxIndicator>
  </TreeView.NodeCheckbox>
{/snippet}

<TreeView.Root {collection} defaultExpandedValue={['src']} defaultCheckedValue={[]}>
  <TreeView.Tree>
    <TreeView.NodeProvider node={branch} indexPath={[0]}>
      <TreeView.Branch>
        <TreeView.BranchControl>
          {@render nodeCheckbox('src')}
          <TreeView.BranchText>src</TreeView.BranchText>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          {#each branch.children ?? [] as child, index (child.id)}
            <TreeView.NodeProvider node={child} indexPath={[0, index]}>
              <TreeView.Item>
                {@render nodeCheckbox(child.id)}
                <TreeView.ItemText>{child.name}</TreeView.ItemText>
              </TreeView.Item>
            </TreeView.NodeProvider>
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    </TreeView.NodeProvider>
  </TreeView.Tree>
</TreeView.Root>
