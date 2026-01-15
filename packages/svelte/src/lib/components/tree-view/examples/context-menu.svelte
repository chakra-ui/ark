<script lang="ts">
  import { Menu } from '$lib'
  import { TreeView, createTreeCollection } from '$lib'
  import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-svelte'
  import menuStyles from 'styles/menu.module.css'
  import styles from 'styles/tree-view.module.css'

  interface TreeNode {
    id: string
    name: string
    children?: TreeNode[]
  }

  const id = $props.id()
  const getNodeId = (node: string) => `${id}/${node}`

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
  })
</script>

<TreeView.Root class={styles.Root} {collection} ids={{ node: getNodeId }}>
  <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
  <TreeView.Tree class={styles.Tree}>
    {#each collection.rootNode.children ?? [] as node, index (node.id)}
      {@render renderNode(node, [index], getNodeId(node.id))}
    {/each}
  </TreeView.Tree>
</TreeView.Root>

{#snippet renderNode(node: TreeNode, indexPath: number[], triggerId: string)}
  <TreeView.NodeProvider {node} {indexPath}>
    <TreeView.NodeContext>
      {#snippet render(nodeState)}
        {#if node.children}
          <TreeView.Branch class={styles.Branch}>
            <Menu.Root ids={{ contextTrigger: triggerId }}>
              <TreeView.BranchControl class={styles.BranchControl}>
                {#snippet asChild(controlProps)}
                  <Menu.ContextTrigger {...controlProps()}>
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
                  </Menu.ContextTrigger>
                {/snippet}
              </TreeView.BranchControl>
              {@render contextMenuContent()}
            </Menu.Root>
            <TreeView.BranchContent class={styles.BranchContent}>
              <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
              {#each node.children as child, index (child.id)}
                {@render renderNode(child, [...indexPath, index], triggerId)}
              {/each}
            </TreeView.BranchContent>
          </TreeView.Branch>
        {:else}
          <Menu.Root ids={{ contextTrigger: triggerId }}>
            <TreeView.Item class={styles.Item}>
              {#snippet asChild(itemProps)}
                <Menu.ContextTrigger {...itemProps()}>
                  <FileIcon />
                  <TreeView.ItemText class={styles.ItemText}>{node.name}</TreeView.ItemText>
                </Menu.ContextTrigger>
              {/snippet}
            </TreeView.Item>
            {@render contextMenuContent()}
          </Menu.Root>
        {/if}
      {/snippet}
    </TreeView.NodeContext>
  </TreeView.NodeProvider>
{/snippet}

{#snippet contextMenuContent()}
  <Menu.Positioner>
    <Menu.Content class={menuStyles.Content}>
      <Menu.Item class={menuStyles.Item} value="rename">Rename</Menu.Item>
      <Menu.Item class={menuStyles.Item} value="delete">Delete</Menu.Item>
    </Menu.Content>
  </Menu.Positioner>
{/snippet}
