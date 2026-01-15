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
              <TreeNodeContextMenu triggerId={props.triggerId}>
                <TreeView.Item
                  class={styles.Item}
                  asChild={(itemProps) => (
                    <Menu.ContextTrigger {...itemProps()}>
                      <FileIcon />
                      <TreeView.ItemText class={styles.ItemText}>{props.node.name}</TreeView.ItemText>
                    </Menu.ContextTrigger>
                  )}
                />
              </TreeNodeContextMenu>
            }
          >
            <TreeView.Branch class={styles.Branch}>
              <TreeNodeContextMenu triggerId={props.triggerId}>
                <TreeView.BranchControl
                  class={styles.BranchControl}
                  asChild={(controlProps) => (
                    <Menu.ContextTrigger {...controlProps()}>
                      <TreeView.BranchIndicator class={styles.BranchIndicator}>
                        <ChevronRightIcon />
                      </TreeView.BranchIndicator>
                      <TreeView.BranchText class={styles.BranchText}>
                        <Show when={nodeState().expanded} fallback={<FolderIcon />}>
                          <FolderOpenIcon />
                        </Show>
                        {props.node.name}
                      </TreeView.BranchText>
                    </Menu.ContextTrigger>
                  )}
                />
              </TreeNodeContextMenu>
              <TreeView.BranchContent class={styles.BranchContent}>
                <TreeView.BranchIndentGuide class={styles.BranchIndentGuide} />
                <For each={props.node.children}>
                  {(child, index) => (
                    <TreeNode node={child} indexPath={[...props.indexPath, index()]} triggerId={props.triggerId} />
                  )}
                </For>
              </TreeView.BranchContent>
            </TreeView.Branch>
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
