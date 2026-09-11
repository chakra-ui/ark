import { TreeView, createTreeCollection, useTreeView } from '@ark-ui/solid/tree-view'
import { ListVirtualizer, useListVirtualizer } from '@ark-ui/solid/virtualizer'
import { ChevronRightIcon, FileIcon, FolderIcon } from 'lucide-solid'
import { Index, Show, createMemo } from 'solid-js'
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
  const tree = useTreeView({
    collection,
    scrollToIndexFn(details) {
      virtualizer.scrollToIndex(details.index, { align: 'auto' })
    },
  })

  const visibleNodes = createMemo(() => tree().getVisibleNodes())

  const virtualizer = useListVirtualizer(() => ({
    count: visibleNodes().length,
    estimatedSize: () => ROW_HEIGHT,
    overscan: 10,
  }))

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
      <TreeView.Tree
        class={styles.Tree}
        style={{ height: '400px' }}
        render={(props) => <ListVirtualizer.Root {...props()} value={virtualizer} />}
      >
        <ListVirtualizer.Content>
          <Index each={virtualizer.getVirtualItems()}>
            {(virtualItem) => {
              const visibleNode = () => visibleNodes()[virtualItem().index]
              const nodeState = createMemo(() =>
                tree().getNodeState({ node: visibleNode().node, indexPath: visibleNode().indexPath }),
              )

              return (
                <TreeView.NodeProvider node={visibleNode().node} indexPath={visibleNode().indexPath}>
                  <TreeView.Node
                    class={styles.Node}
                    render={(props) => <ListVirtualizer.Item {...props()} item={virtualItem()} />}
                  >
                    <TreeView.Cell class={styles.Cell} style={{ 'padding-left': `${nodeState().depth * 22}px` }}>
                      <Show when={nodeState().isBranch}>
                        <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                          <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                            <ChevronRightIcon />
                          </TreeView.NodeIndicator>
                        </TreeView.NodeExpandTrigger>
                      </Show>
                      <TreeView.NodeText class={styles.NodeText}>
                        <Show when={nodeState().isBranch} fallback={<FileIcon />}>
                          <FolderIcon />
                        </Show>{' '}
                        {visibleNode().node.name}
                      </TreeView.NodeText>
                    </TreeView.Cell>
                  </TreeView.Node>
                </TreeView.NodeProvider>
              )
            }}
          </Index>
        </ListVirtualizer.Content>
      </TreeView.Tree>
    </TreeView.RootProvider>
  )
}
