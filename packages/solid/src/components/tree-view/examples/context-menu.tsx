import { Menu } from '@ark-ui/solid/menu'
import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { ChevronRightIcon, FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-solid'
import { For, Show, createUniqueId, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import menuStyles from 'styles/menu.module.css'
import styles from 'styles/tree-view.module.css'

interface TreeNodeContextMenuProps extends Menu.RootProps {
  triggerId: string
}

const TreeNodeContextMenu = (props: ParentProps<TreeNodeContextMenuProps>) => {
  return (
    <Menu.Root {...props} ids={{ contextTrigger: props.triggerId }}>
      {props.children}
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menuStyles.Content}>
            <Menu.Item class={menuStyles.Item} value="rename">
              Rename
            </Menu.Item>
            <Menu.Item class={menuStyles.Item} value="delete">
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

const getNodeId = (uid: string, node: string) => `${uid}/${node}`

export const ContextMenu = () => {
  const uid = createUniqueId()
  return (
    <TreeView.Root class={styles.Root} collection={collection} ids={{ node: (value) => getNodeId(uid, value) }}>
      <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection.rootNode.children}>
          {(node, index) => <TreeNode node={node} indexPath={[index()]} triggerId={getNodeId(uid, node.id)} />}
        </For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node> & { triggerId: string }) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      <TreeView.NodeContext>
        {(nodeState) => (
          <Show
            when={props.node.children}
            fallback={
              <TreeView.Node class={styles.Node}>
                <TreeNodeContextMenu triggerId={props.triggerId}>
                  <TreeView.Cell
                    class={styles.Cell}
                    asChild={(cellProps) => (
                      <Menu.ContextTrigger {...cellProps()}>
                        <FileIcon />
                        <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
                      </Menu.ContextTrigger>
                    )}
                  />
                </TreeNodeContextMenu>
              </TreeView.Node>
            }
          >
            <TreeView.NodeGroup class={styles.NodeGroup}>
              <TreeView.Node class={styles.Node}>
                <TreeNodeContextMenu triggerId={props.triggerId}>
                  <TreeView.Cell
                    class={styles.Cell}
                    asChild={(cellProps) => (
                      <Menu.ContextTrigger {...cellProps()}>
                        <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                          <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                            <ChevronRightIcon />
                          </TreeView.NodeIndicator>
                        </TreeView.NodeExpandTrigger>
                        <TreeView.NodeText class={styles.NodeText}>
                          <Show when={nodeState().expanded} fallback={<FolderIcon />}>
                            <FolderOpenIcon />
                          </Show>
                          {props.node.name}
                        </TreeView.NodeText>
                      </Menu.ContextTrigger>
                    )}
                  />
                </TreeNodeContextMenu>
              </TreeView.Node>
              <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
                <TreeView.IndentGuide class={styles.IndentGuide} />
                <For each={props.node.children}>
                  {(child, index) => (
                    <TreeNode node={child} indexPath={[...props.indexPath, index()]} triggerId={props.triggerId} />
                  )}
                </For>
              </TreeView.NodeGroupContent>
            </TreeView.NodeGroup>
          </Show>
        )}
      </TreeView.NodeContext>
    </TreeView.NodeProvider>
  )
}

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
