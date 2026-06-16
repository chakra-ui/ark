import { TreeView, createTreeCollection } from '@ark-ui/react/tree-view'
import { CheckIcon, ChevronRightIcon, MinusIcon } from 'lucide-react'
import styles from 'styles/tree-view.module.css'

export const CheckboxTree = () => {
  return (
    <TreeView.Root className={styles.Root} collection={collection} defaultCheckedValue={[]}>
      <TreeView.Label className={styles.Label}>Tree</TreeView.Label>
      <TreeView.Tree className={styles.Tree}>
        {collection.rootNode.children?.map((node, index) => (
          <TreeNode key={node.id} node={node} indexPath={[index]} />
        ))}
      </TreeView.Tree>
    </TreeView.Root>
  )
}

const TreeNodeCheckbox = (props: TreeView.NodeCheckboxProps) => {
  return (
    <TreeView.NodeCheckbox className={styles.NodeCheckbox} {...props}>
      <TreeView.NodeIndicator type="checked" className={styles.NodeIndicator}>
        <CheckIcon />
      </TreeView.NodeIndicator>
      <TreeView.NodeIndicator type="indeterminate" className={styles.NodeIndicator}>
        <MinusIcon />
      </TreeView.NodeIndicator>
    </TreeView.NodeCheckbox>
  )
}

const TreeNode = (props: TreeView.NodeProviderProps<Node>) => {
  const { node, indexPath } = props
  return (
    <TreeView.NodeProvider key={node.id} node={node} indexPath={indexPath}>
      {node.children ? (
        <TreeView.NodeGroup className={styles.NodeGroup}>
          <TreeView.Node className={styles.Node}>
            <TreeView.Cell className={styles.Cell}>
              <TreeView.NodeExpandTrigger className={styles.NodeExpandTrigger}>
                <TreeView.NodeIndicator type="expanded" className={styles.NodeIndicator}>
                  <ChevronRightIcon />
                </TreeView.NodeIndicator>
              </TreeView.NodeExpandTrigger>
              <TreeNodeCheckbox />
              <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
            </TreeView.Cell>
          </TreeView.Node>
          <TreeView.NodeGroupContent className={styles.NodeGroupContent}>
            <TreeView.IndentGuide className={styles.IndentGuide} />
            {node.children.map((child, index) => (
              <TreeNode key={child.id} node={child} indexPath={[...indexPath, index]} />
            ))}
          </TreeView.NodeGroupContent>
        </TreeView.NodeGroup>
      ) : (
        <TreeView.Node className={styles.Node}>
          <TreeView.Cell className={styles.Cell}>
            <TreeNodeCheckbox />
            <TreeView.NodeText className={styles.NodeText}>{node.name}</TreeView.NodeText>
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
