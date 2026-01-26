<script lang="ts">
  import { TreeView, createTreeCollection, useTreeView } from '$lib'
  import { createVirtualizer } from '@tanstack/svelte-virtual'
  import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tree-view.module.css'
  import { get } from 'svelte/store'

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

  let treeRef = $state<HTMLDivElement | null>(null)

  const id = $props.id()
  const tree = useTreeView({
    collection,
    id,
    scrollToIndexFn(details) {
      get(virtualizer)?.scrollToIndex(details.index, { align: 'auto' })
    },
  })

  const visibleNodes = $derived(tree().getVisibleNodes())

  const virtualizer = createVirtualizer<HTMLDivElement, Element>({
    get count() {
      return visibleNodes.length
    },
    getScrollElement: () => treeRef,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  })
</script>

<TreeView.RootProvider class={styles.Root} value={tree}>
  <TreeView.Label class={styles.Label}>Virtualized Tree ({visibleNodes.length} visible nodes)</TreeView.Label>
  <div class="hstack">
    <button class={button.Root} onclick={() => tree().collapse()}>Collapse all</button>
    <button class={button.Root} onclick={() => tree().expand()}>Expand all</button>
  </div>
  <TreeView.Tree bind:ref={treeRef} class={styles.Tree} style="height: 400px; overflow: auto;">
    <div style="min-height: {$virtualizer.getTotalSize()}px; width: 100%; position: relative;">
      {#each $virtualizer.getVirtualItems() as virtualItem (visibleNodes[virtualItem.index].node.id)}
        {@const visibleNode = visibleNodes[virtualItem.index]}
        {@const nodeState = tree().getNodeState({ node: visibleNode.node, indexPath: visibleNode.indexPath })}
        <div
          data-index={virtualItem.index}
          onpointerdown={(e) => {
            if (e.button !== 0) return
            tree().focus(visibleNode.node.id)
          }}
          style="position: absolute; top: 0; left: 0; width: 100%; height: {virtualItem.size}px; transform: translateY({virtualItem.start}px);"
        >
          <TreeView.NodeProvider node={visibleNode.node} indexPath={visibleNode.indexPath}>
            {#if nodeState.isBranch}
              <TreeView.BranchControl class={styles.BranchControl} style="padding-left: {nodeState.depth * 22}px">
                <TreeView.BranchIndicator class={styles.BranchIndicator}>
                  <ChevronRightIcon />
                </TreeView.BranchIndicator>
                <TreeView.BranchText class={styles.BranchText}>
                  <FolderIcon />
                  {visibleNode.node.name}
                </TreeView.BranchText>
              </TreeView.BranchControl>
            {:else}
              <TreeView.Item class={styles.Item} style="padding-left: {nodeState.depth * 22}px">
                <TreeView.ItemText class={styles.ItemText}>
                  <FileIcon />
                  {visibleNode.node.name}
                </TreeView.ItemText>
              </TreeView.Item>
            {/if}
          </TreeView.NodeProvider>
        </div>
      {/each}
    </div>
  </TreeView.Tree>
</TreeView.RootProvider>
