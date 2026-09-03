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
          <TreeView.NodeGroup class={styles.NodeGroup}>
            <TreeView.Node class={styles.Node}>
              <Menu.Root ids={{ contextTrigger: triggerId }}>
                <TreeView.Cell class={styles.Cell}>
                  {#snippet asChild(cellProps)}
                    <Menu.ContextTrigger {...cellProps()}>
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
                    </Menu.ContextTrigger>
                  {/snippet}
                </TreeView.Cell>
                {@render contextMenuContent()}
              </Menu.Root>
            </TreeView.Node>
            <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
              <TreeView.IndentGuide class={styles.IndentGuide} />
              {#each node.children as child, index (child.id)}
                {@render renderNode(child, [...indexPath, index], triggerId)}
              {/each}
            </TreeView.NodeGroupContent>
          </TreeView.NodeGroup>
        {:else}
          <TreeView.Node class={styles.Node}>
            <Menu.Root ids={{ contextTrigger: triggerId }}>
              <TreeView.Cell class={styles.Cell}>
                {#snippet asChild(cellProps)}
                  <Menu.ContextTrigger {...cellProps()}>
                    <FileIcon />
                    <TreeView.NodeText class={styles.NodeText}>{node.name}</TreeView.NodeText>
                  </Menu.ContextTrigger>
                {/snippet}
              </TreeView.Cell>
              {@render contextMenuContent()}
            </Menu.Root>
          </TreeView.Node>
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
