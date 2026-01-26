import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/react/tree-view'
import { useVirtualizer, type Virtualizer } from '@tanstack/react-virtual'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'
import { useRef } from 'react'
import { flushSync } from 'react-dom'
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
  const treeRef = useRef<HTMLDivElement | null>(null)
  const virtualizerRef = useRef<Virtualizer<HTMLDivElement, Element> | null>(null)

  const tree = useTreeView({
    collection,
    scrollToIndexFn(details) {
      flushSync(() => {
        virtualizerRef.current?.scrollToIndex(details.index, { align: 'auto' })
      })
    },
  })

  const visibleNodes = tree.getVisibleNodes()

  const virtualizer = useVirtualizer({
    count: visibleNodes.length,
    getScrollElement: () => treeRef.current,
    estimateSize: () => ROW_HEIGHT,
    overscan: 10,
  })

  virtualizerRef.current = virtualizer

  return (
    <TreeView.RootProvider className={styles.Root} value={tree}>
      <TreeView.Label className={styles.Label}>Virtualized Tree ({visibleNodes.length} visible nodes)</TreeView.Label>
      <div className="hstack">
        <button className={button.Root} onClick={() => tree.collapse()}>
          Collapse all
        </button>
        <button className={button.Root} onClick={() => tree.expand()}>
          Expand all
        </button>
      </div>
      <TreeView.Tree className={styles.Tree} ref={treeRef} style={{ height: 400, overflow: 'auto' }}>
        <div style={{ minHeight: virtualizer.getTotalSize(), width: '100%', position: 'relative' }}>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const { node, indexPath } = visibleNodes[virtualItem.index]
            const nodeState = tree.getNodeState({ node, indexPath })

            return (
              <div
                key={node.id}
                data-index={virtualItem.index}
                onPointerDown={(e) => {
                  if (e.button !== 0) return
                  tree.focus(node.id)
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
                <TreeView.NodeProvider node={node} indexPath={indexPath}>
                  {nodeState.isBranch ? (
                    <TreeView.BranchControl
                      className={styles.BranchControl}
                      style={{ paddingLeft: nodeState.depth * 22 }}
                    >
                      <TreeView.BranchIndicator className={styles.BranchIndicator}>
                        <ChevronRightIcon />
                      </TreeView.BranchIndicator>
                      <TreeView.BranchText className={styles.BranchText}>
                        <FolderIcon /> {node.name}
                      </TreeView.BranchText>
                    </TreeView.BranchControl>
                  ) : (
                    <TreeView.Item className={styles.Item} style={{ paddingLeft: nodeState.depth * 22 }}>
                      <TreeView.ItemText className={styles.ItemText}>
                        <FileIcon /> {node.name}
                      </TreeView.ItemText>
                    </TreeView.Item>
                  )}
                </TreeView.NodeProvider>
              </div>
            )
          })}
        </div>
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}
