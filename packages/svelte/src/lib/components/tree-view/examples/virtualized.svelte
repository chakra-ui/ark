<script lang="ts">
  import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/svelte/tree-view'
  import { ListVirtualizer, useListVirtualizer } from '@ark-ui/svelte/virtualizer'
  import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tree-view.module.css'

  interface Node {
    id: string
    name: string
    children?: Node[]
  }

  function generateLargeTree(): Node {
    const folders: Node[] = []
    for (let i = 0; i < 50; i++) {
      const children: Node[] = []
      for (let j = 0; j < 20; j++) {
        children.push({ id: `folder-${i}/file-${i}-${j}.ts`, name: `file-${i}-${j}.ts` })
      }
      folders.push({ id: `folder-${i}`, name: `folder-${i}`, children })
    }
    return {
      id: 'ROOT',
      name: '',
      children: folders,
    }
  }

  const collection = createTreeCollection<Node>({
    nodeToValue: (node) => node.id,
    nodeToString: (node) => node.name,
    rootNode: generateLargeTree(),
  })

  const ROW_HEIGHT = 32

  const id = $props.id()
  const tree = useTreeView({
    collection,
    id,
    scrollToIndexFn(details) {
      virtualizer.scrollToIndex(details.index, { align: 'auto' })
    },
  })

  const visibleNodes = $derived(tree().getVisibleNodes())

  const virtualizer = useListVirtualizer(() => ({
    count: visibleNodes.length,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
  }))
</script>

<TreeView.RootProvider class={styles.Root} value={tree}>
  <TreeView.Label class={styles.Label}>Virtualized Tree ({visibleNodes.length} visible nodes)</TreeView.Label>
  <div class="hstack">
    <button class={button.Root} onclick={() => tree().collapse()}>Collapse all</button>
    <button class={button.Root} onclick={() => tree().expand()}>Expand all</button>
  </div>
  <TreeView.Tree class={styles.Tree} style="height: 400px">
    {#snippet render(props)}
      <ListVirtualizer.Root {...props()} value={virtualizer}>
        <ListVirtualizer.Content>
          {#each virtualizer.getVirtualItems() as virtualItem (visibleNodes[virtualItem.index].node.id)}
            {@const visibleNode = visibleNodes[virtualItem.index]}
            {@const nodeState = tree().getNodeState({ node: visibleNode.node, indexPath: visibleNode.indexPath })}
            <TreeView.NodeProvider node={visibleNode.node} indexPath={visibleNode.indexPath}>
              <TreeView.Node class={styles.Node}>
                {#snippet render(props)}
                  <ListVirtualizer.Item {...props()} item={virtualItem}>
                    <TreeView.Cell class={styles.Cell} style="padding-left: {nodeState.depth * 22}px">
                      {#if nodeState.isBranch}
                        <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                          <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                            <ChevronRightIcon />
                          </TreeView.NodeIndicator>
                        </TreeView.NodeExpandTrigger>
                      {/if}
                      <TreeView.NodeText class={styles.NodeText}>
                        {#if nodeState.isBranch}
                          <FolderIcon />
                        {:else}
                          <FileIcon />
                        {/if}
                        {visibleNode.node.name}
                      </TreeView.NodeText>
                    </TreeView.Cell>
                  </ListVirtualizer.Item>
                {/snippet}
              </TreeView.Node>
            </TreeView.NodeProvider>
          {/each}
        </ListVirtualizer.Content>
      </ListVirtualizer.Root>
    {/snippet}
  </TreeView.Tree>
</TreeView.RootProvider>
