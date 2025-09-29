<script lang="ts">
  // biome-ignore lint/style/useImportType: intentional
  import { TreeView, createTreeCollection } from '@ark-ui/svelte/tree-view'
  import { SquareCheckBigIcon, ChevronRightIcon, FileIcon, FolderIcon, LoaderCircleIcon } from 'lucide-svelte'

  interface Node {
    id: string
    name: string
    children?: Node[]
    childrenCount?: number
  }

  // mock api result
  const response: Record<string, Node[]> = {
    node_modules: [
      { id: 'zag-js', name: 'zag-js' },
      { id: 'pandacss', name: 'panda' },
      { id: '@types', name: '@types', childrenCount: 2 },
    ],
    'node_modules/@types': [
      { id: 'react', name: 'react' },
      { id: 'react-dom', name: 'react-dom' },
    ],
    src: [
      { id: 'app.tsx', name: 'app.tsx' },
      { id: 'index.ts', name: 'index.ts' },
    ],
  }

  // function to load children of a node
  function loadChildren(details: TreeView.LoadChildrenDetails<Node>): Promise<Node[]> {
    const value = details.valuePath.join('/')
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response[value] ?? [])
      }, 1200)
    })
  }

  const initialCollection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: {
      id: 'ROOT',
      name: '',
      children: [
        { id: 'node_modules', name: 'node_modules', childrenCount: 3 },
        { id: 'src', name: 'src', childrenCount: 2 },
        { id: 'panda.config', name: 'panda.config.ts' },
        { id: 'package.json', name: 'package.json' },
        { id: 'renovate.json', name: 'renovate.json' },
        { id: 'readme.md', name: 'README.md' },
      ],
    },
  })

  let collection = $state(initialCollection)
</script>

<TreeView.Root {collection} {loadChildren} onLoadChildrenComplete={(e) => (collection = e.collection)}>
  <TreeView.Label>Tree</TreeView.Label>
  <TreeView.Tree>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render TreeNode(node, [index])}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet TreeNodeIndicator()}
  <TreeView.NodeContext>
    {#snippet render(nodeState)}
      {#if nodeState().loading}
        <LoaderCircleIcon style="animation: spin 1s infinite" />
      {:else}
        <FolderIcon />
      {/if}
    {/snippet}
  </TreeView.NodeContext>
{/snippet}

{#snippet TreeNode(node: Node, indexPath: number[])}
  <TreeView.NodeProvider {node} {indexPath}>
    {#if node.children || node.childrenCount}
      <TreeView.Branch>
        <TreeView.BranchControl>
          <TreeView.BranchText>
            {@render TreeNodeIndicator()}
            {node.name}
          </TreeView.BranchText>
          <TreeView.BranchIndicator>
            <ChevronRightIcon />
          </TreeView.BranchIndicator>
        </TreeView.BranchControl>
        <TreeView.BranchContent>
          <TreeView.BranchIndentGuide />
          {#each node.children ?? [] as child, index (child.id)}
            {@render TreeNode(child, [...indexPath, index])}
          {/each}
        </TreeView.BranchContent>
      </TreeView.Branch>
    {:else}
      <TreeView.Item>
        <TreeView.ItemIndicator>
          <SquareCheckBigIcon />
        </TreeView.ItemIndicator>
        <TreeView.ItemText>
          <FileIcon />
          {node.name}
        </TreeView.ItemText>
      </TreeView.Item>
    {/if}
  </TreeView.NodeProvider>
{/snippet}
