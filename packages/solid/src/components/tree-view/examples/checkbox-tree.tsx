import { TreeView, createTreeCollection } from '@ark-ui/solid/tree-view'
import { CheckIcon, ChevronRightIcon, MinusIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/tree-view.module.css'

export const CheckboxTree = () => {
  return (
    <TreeView.Root class={styles.Root} collection={collection} defaultCheckedValue={[]}>
      <TreeView.Label class={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree class={styles.Tree}>
        <For each={collection.rootNode.children}>{(node, index) => <TreeNode node={node} indexPath={[index()]} />}</For>
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNodeCheckbox = (props: TreeView.NodeCheckboxProps) => {
  return (
    <TreeView.NodeCheckbox class={styles.NodeCheckbox} {...props}>
      <TreeView.NodeIndicator type="checked" class={styles.NodeIndicator}>
        <CheckIcon />
      </TreeView.NodeIndicator>
      <TreeView.NodeIndicator type="indeterminate" class={styles.NodeIndicator}>
        <MinusIcon />
      </TreeView.NodeIndicator>
    </TreeView.NodeCheckbox>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  return (
    <TreeView.NodeProvider node={props.node} indexPath={props.indexPath}>
      {props.node.children ? (
        <TreeView.NodeGroup class={styles.NodeGroup}>
          <TreeView.Node class={styles.Node}>
            <TreeView.Cell class={styles.Cell}>
              <TreeView.NodeExpandTrigger class={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" class={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeNodeCheckbox />
              <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent class={styles.NodeGroupContent}>
            <TreeView.IndentGuide class={styles.IndentGuide} />
            <For each={props.node.children}>
              {(child, index) => <TreeNode node={child} indexPath={[...props.indexPath, index()]} />}
            </For>
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node class={styles.Node}>
          <TreeView.Cell class={styles.Cell}>
            <TreeNodeCheckbox />
            <TreeView.NodeText class={styles.NodeText}>{props.node.name}</TreeView.NodeText>
          </TreeView.Cell>
        </TreeView.Node>
      )}
    </TreeView.NodeProvider>
  )
}

interface Node {
  id: string
  name: string
  children?: Node[] | undefined
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
