import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/solid/tree-view'
import { createVirtualizer, type Virtualizer } from '@tanstack/solid-virtual'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-solid'
import { For } from 'solid-js'
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

export const Virtualized = () => {
  let treeRef: HTMLDivElement | undefined
  let virtualizerRef: Virtualizer<HTMLDivElement, Element> | undefined

  const tree = useTreeView({
    collection,
    scrollToIndexFn(details) {
      virtualizerRef?.scrollToIndex(details.index, { align: 'auto' })
    },
  })

  const visibleNodes = () => tree().getVisibleNodes()

  const virtualizer = createVirtualizer({
    get count() {
      return visibleNodes().length
    },
    getScrollElement: () => treeRef ?? null,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  })

  virtualizerRef = virtualizer

  return (
    <TreeView.RootProvider class={styles.Root} value={tree}>
      <TreeView.Label class={styles.Label}>Virtualized Tree ({visibleNodes().length} visible nodes)</TreeView.Label>
      <div class="hstack">
        <button class={button.Root} onClick={() => tree().collapse()}>
          Collapse all
        </button>
        <button class={button.Root} onClick={() => tree().expand()}>
          Expand all
        </button>
      </div>
      <TreeView.Tree class={styles.Tree} ref={treeRef} style={{ height: '400px', overflow: 'auto' }}>
        <div
          style={{
            'min-height': `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          <For each={virtualizer.getVirtualItems()}>
            {(virtualItem) => {
              const visibleNode = () => visibleNodes()[virtualItem.index]
              const nodeState = () =>
                tree().getNodeState({ node: visibleNode().node, indexPath: visibleNode().indexPath })

              return (
                <div
                  data-index={virtualItem.index}
                  onPointerDown={(e) => {
                    if (e.button !== 0) return
                    tree().focus(visibleNode().node.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <TreeView.NodeProvider node={visibleNode().node} indexPath={visibleNode().indexPath}>
                    {nodeState().isBranch ? (
                      <TreeView.BranchControl
                        class={styles.BranchControl}
                        style={{ 'padding-left': `${nodeState().depth * 22}px` }}
                      >
                        <TreeView.BranchIndicator class={styles.BranchIndicator}>
                          <ChevronRightIcon />
                        </TreeView.BranchIndicator>
                        <TreeView.BranchText class={styles.BranchText}>
                          <FolderIcon /> {visibleNode().node.name}
                        </TreeView.BranchText>
                      </TreeView.BranchControl>
                    ) : (
                      <TreeView.Item class={styles.Item} style={{ 'padding-left': `${nodeState().depth * 22}px` }}>
                        <TreeView.ItemText class={styles.ItemText}>
                          <FileIcon /> {visibleNode().node.name}
                        </TreeView.ItemText>
                      </TreeView.Item>
                    )}
                  </TreeView.NodeProvider>
                </div>
              )
            }}
          </For>
        </div>
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}
