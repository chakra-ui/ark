import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/react/tree-view'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/react/virtualizer'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-react'
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
  const virtualizer = useListVirtualizer({
    count: 0,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
  })

  const tree = useTreeView({
    collection,
    scrollToIndexFn(details) {
      virtualizer.scrollToIndex(details.index, { align: 'auto' })
    },
  })

  const visibleNodes = tree.getVisibleNodes()
  virtualizer.updateOptions({ count: visibleNodes.length })

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
      <TreeView.Tree
        className={styles.Tree}
        style={{ height: 400 }}
        render={<ListVirtualizer.Root value={virtualizer} />}
      >
        <ListVirtualizer.Content>
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const { node, indexPath } = visibleNodes[virtualItem.index]
            const nodeState = tree.getNodeState({ node, indexPath })

            return (
              <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
                <TreeView.Node className={styles.Node} render={<ListVirtualizer.Item item={virtualItem} />}>
                  <TreeView.Cell className={styles.Cell} style={{ paddingLeft: nodeState.depth * 22 }}>
                    {nodeState.isBranch && (
                      <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                        <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                          <ChevronRightIcon />
                        </TreeView.NodeIndicator>
                      </TreeView.NodeExpandTrigger>
                    )}
                    <TreeView.NodeText className={styles.NodeText}>
                      {nodeState.isBranch ? <FolderIcon /> : <FileIcon />} {node.name}
                    </TreeView.NodeText>
                  </TreeView.Cell>
                </TreeView.Node>
              </TreeView.NodeProvider>
            )
          })}
        </ListVirtualizer.Content>
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}
